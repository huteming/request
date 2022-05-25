/**
 * 注意
 * 1. 类型文件都是无法识别别名的，所以源文件中类型文件只能用相对路径
 */
export const rollup = {
  input: 'src/preset/standard-pc.ts',
  output: [
    {
      file: 'preset/standard-pc.esm.js',
      format: 'esm',
      target: 'browser', // "node" | "browser"
    },
    {
      file: 'preset/standard-pc.js',
      format: 'cjs',
      exports: 'auto',
      target: 'browser', // "node" | "browser"
    },
  ],
}
