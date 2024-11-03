 import {it,expect,describe} from 'vitest'
 import {add} from '../src/utils'
  describe('utils test',()=>{
    it('100% PASS',()=>{
      expect(1).toBe(1)
    })
    it('add',()=>{
      expect(add(1,2)).toBe(3)
    })
  }) 