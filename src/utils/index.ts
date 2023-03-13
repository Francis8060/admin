import { type Ref, ref } from 'vue'
import { ElMessage, type messageType } from 'element-plus'
import JSEncrypt from 'jsencrypt'

export function useState<T>(initData: T): [Ref<T>, (val: T) => void] {
    const data = ref(initData) as Ref<T>
    function setData (val: T) {
        data.value = val
    }
    return [data, setData]
}

export function showMessage (message: string, type: messageType = 'warning') {
    ElMessage.closeAll()
    ElMessage({
        type,
        message
    })
}

export const rsaEncrypt = (
    () => {
        const PUBLIC_KEY = 'hahuihasidguyguygusd'
        return (password: string, key = PUBLIC_KEY) => {
            const verify = new JSEncrypt()
            verify.setPublicKey(key)
            return verify.encrypt(password) || password
        }
    }
)()