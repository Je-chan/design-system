import esbuild from 'esbuild'
import pkg from './package.json' assert {type: 'json'}

const dev = process.argv.includes("--dev")

// 개발 환경에서는 minify 를 할 필요 없음. 굳이 더 많은 시간 투자할 필요 없음
const minify = !dev

// watch script
const watch = process.argv.includes("--watch")

// package
const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies
})


const BASE_CONFIG = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify,
    sourcemap: true,
    outdir: 'dist',
    target: 'es2019',
    watch,
    external
}

Promise.all([
    // Ecma JS
    esbuild.build({
        ...BASE_CONFIG,
        format: 'esm'
    }),
    // commonjs es module
    esbuild.build({
        ...BASE_CONFIG,
        format: 'cjs',
        outExtension: {
            ".js": '.cjs',
        }
    })
]).catch(() => {
    console.error("BUILD FAIL")
    process.exit(1);
})



