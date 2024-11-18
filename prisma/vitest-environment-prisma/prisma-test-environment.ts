import type { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    

    return {
      teardown() {
      }
    }
  }
}