import { type Ref, ref } from 'vue'
import { ElMessage, type messageType } from 'element-plus'

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