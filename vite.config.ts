import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import childProcess from 'child_process'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import { zip } from './plugins/zip'

function createTime () {
    const now = new Date()
	const year = now.getFullYear()
    const month = `${now.getMonth() + 1}`.padStart(2, '0')
    const date = `${now.getDate()}`.padStart(2, '0')
    const hour = `${now.getHours()}`.padStart(2, '0')
    const minutes = `${now.getMinutes()}`.padStart(2, '0')
	const seconds = `${now.getSeconds()}`.padStart(2, '0')
    return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
}

function getBranch () {
    return childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}

function getCommitId () {
    return childProcess.execSync('git rev-parse --short HEAD').toString().trim()
}


export default (config: ConfigEnv): UserConfigExport => {
    const { mode, command } = config
    // dev mode: development command: serve
    // build mode: production command: build
    // preview mode: production command: serve
    const root = process.cwd()
    const { VITE_IS_MOCK, VITE_API_PREFIX, VITE_PROXY_URL } = loadEnv(mode, root)
    
    const userConfig: UserConfigExport = {
        root,
		base: './',
        resolve: {
			alias: [{
                find: '@',
                replacement: resolve(__dirname, './src')
			}],
			extensions: ['.js', '.ts', '.json', '.vue']
		},
        plugins: [
            vue(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        injectScript:
                        `
                        <script>
                            window.branchVersion = '${getBranch()}'
                            window.branchBuildTime = '${createTime()}'
                            window.branchCommitId = '${getCommitId()}'
                        </script>
                        `
                    }
                }
            }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: command === 'serve' && VITE_IS_MOCK === 'true',
            }),
            zip(mode)
        ],
        build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					'keep_infinity': true,
					'drop_console': true
				}
			},
			chunkSizeWarningLimit: 2000
		}
    }
    return userConfig
}
