import path from 'path'
import * as fs from 'fs'
import JSZip  from 'jszip'
import type { Plugin } from 'vite'
import childProcess from 'child_process'

const fileZip = new JSZip()

let buildOutDir = ''

function readDir(fileZip: JSZip, dirPath: string) {
    const files = fs.readdirSync(dirPath);
    files.forEach(fileName => {
        const fillPath = dirPath + "/" + fileName
        const file = fs.statSync(fillPath)
        if (file.isDirectory()) {
            const dirZip = fileZip.folder(fileName) as JSZip
            readDir(dirZip, fillPath)
        } else {
            fileZip.file(fileName, fs.readFileSync(fillPath))
        }
    })
}

function creatZipName (mode: string) {
    const develop = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

    const now = new Date()
    const month = `${now.getMonth() + 1}`.padStart(2, '0')
    const date = `${now.getDate()}`.padStart(2, '0')
    const hour = `${now.getHours()}`.padStart(2, '0')
    const minutes = `${now.getMinutes()}`.padStart(2, '0')
    return `${develop}_${mode}_${month}${date}_${hour}${minutes}` 
}

export function zip(mode: string): Plugin {
    return {
        name: 'vite-plugin-file-zip',
        apply: 'build',
        enforce: 'post',
        configResolved (config) {
            buildOutDir = config.build.outDir || 'dist'
        },
        closeBundle () {
            const rootDir = path.resolve(process.cwd(), buildOutDir)
            const zipName = creatZipName(mode)
            readDir(fileZip, rootDir)
            fileZip.generateAsync({
                type: "nodebuffer",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 9
                }
            }).then(content => {
                fs.mkdirSync(rootDir, {
                    recursive: true
                })
                fs.writeFileSync(`${rootDir}/${zipName}.zip`, content)
            })
        }
    }
}