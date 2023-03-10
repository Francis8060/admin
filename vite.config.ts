import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'

function createTime () {
    const now = new Date()
	const year = now.getFullYear()
    const month = `0${now.getMonth() + 1}`.padStart(2, '0')
    const date = `0${now.getDate()}`.padStart(2, '0')
    const hour = `0${now.getHours()}`.padStart(2, '0')
    const minutes = `0${now.getMinutes()}`.padStart(2, '0')
	const seconds = `0${now.getSeconds()}`.padStart(2, '0')
    return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
}


export default (config: ConfigEnv): UserConfigExport => {
    const { mode, command } = config
    // dev mode: development command: serve
    console.log(config)
    
    const userConfig: UserConfigExport = {
        root: process.cwd(),
		base: './',
        resolve: {
			alias: [{
                find: '@',
                replacement: resolve(__dirname, './src')
			}],
			extensions: ['.js', '.ts', '.json', '.vue']
		},
        plugins: [
            vue()
        ]
    }
    return userConfig
}
