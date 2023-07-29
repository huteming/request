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

export const jest = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupFiles/setupTests.ts'],
}
