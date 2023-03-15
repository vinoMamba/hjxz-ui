/**
 * 此插件参考 https://github.com/xiuxiuyifan/z-vue3-ui/blob/master/plugins/source-code.ts
 */
import { readFileSync } from 'node:fs'

export default function SourceCode() {
  return {
    name: 'source-code',
    async transform(code: any, id: string) {
      if (~id.indexOf('demo-code') && !~id.indexOf('?')) {
        const sourceCode = JSON.stringify(readFileSync(id).toString())
        let genCode = code.split('export default')[0] || ''
        genCode += `_sfc_main.__sourceCode = ${sourceCode}\n`
        genCode += 'export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]])'
        return {
          code: genCode,
          map: null,
        }
      }
    },
  }
}
