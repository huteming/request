/**
 * 注意
 * 1. 类型文件都是无法识别别名的，所以源文件中类型文件只能用相对路径
 */
export const rollup = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'auto',
    },
  ],
}

// export const rollup = {
//   input: 'src/preset/standard-pc.ts',
//   output: [
//     {
//       file: 'preset/standard-pc.esm.js',
//       format: 'esm',
//       target: 'browser', // "node" | "browser"
//     },
//     {
//       file: 'preset/standard-pc.js',
//       format: 'cjs',
//       exports: 'auto',
//       target: 'browser', // "node" | "browser"
//     },
//   ],
// }

// export const babel = {
//   output: [
//     {
//       dir: 'dist',
//       format: 'esm', // 'esm' | 'cjs'
//       target: 'browser', // "node" | "browser"
//     },
//   ],
//   plugins: [],
// }

export const jest = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupFiles/setupTests.ts'],
  extraBabelPlugins: [
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
}
