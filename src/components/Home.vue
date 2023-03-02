<script>
import {execute_operation} from '@/api/operationRequests.js'
import { showDialog } from 'vant';
export default {
  data() {
    return {
      operand1: null,
      operand2: null,
      operation: 'ADDITION',
    }
  },
  methods: {
    onSubmit() {
        execute_operation(parseFloat(this.operand1),parseFloat(this.operand2),this.operation).then(data => {
            console.log(data)
            if(data.error) {
                showDialog({
                    title: 'Ups...',
                    message: data.message,
                    confirmButtonText: 'Ok'
                })
                return
            }

            showDialog({
                title: 'Result',
                message: data.data,
                confirmButtonText: 'Ok'
            })
        })
    }
  }
}
</script>

<template>
  <main>
    <van-nav-bar title="Cloud calculator">
        <template #right>
            <van-row gutter="60">
                <van-col span="8">
                    <van-button type="primary" to="records">Records</van-button>
                </van-col>
                <van-col span="8">
                    <van-button type="danger">Logout</van-button>
                </van-col>
            </van-row>
        </template>
    </van-nav-bar>

    <van-row justify="center">
			<van-col span="8">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field 
                v-model="operand1" 
                type="number" 
                label="Number" 
                :rules="[{ required: true, message: 'Operand is required' }]"
            />
    
            <van-field 
                v-model="operand2" 
                type="number" 
                label="Number" 
                :rules="[{ required: true, message: 'Operand is required' }]"
            />
    
            <van-radio-group v-model="operation" direction="horizontal">
              <van-space>
                <van-radio name="ADDITION">Addition</van-radio>
                <van-radio name="SUBSTRACTION">Substraction</van-radio>
                <van-radio name="MULTIPLICATION">Multiplication</van-radio>
                <van-radio name="DIVISION">Division</van-radio>
                <van-radio name="SQUARED_ROOT">Squared root</van-radio>
                <van-radio name="RANDOM_STRING">Random string</van-radio>
              </van-space>
            </van-radio-group>
    
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              Calculate
            </van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>

  </main>
</template>

<style scoped>

</style>
