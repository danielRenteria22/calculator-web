<script>
import { listOperations,deleteOperation } from '@/api/operationRequests.js'
import { showDialog,showConfirmDialog } from 'vant';
import { ref } from 'vue';
export default {
  setup() {
    const columns = [
      [
        { text: 'Operation', value: 'operation_type' },
        { text: 'Cost', value: 'amount' },
      ],
      [
        { text: 'Descending', value: 'desc' },
        { text: 'Ascending', value: 'asc' }
      ],
    ];

    return { columns };
  },
  mounted() {
      this.loadRecords()
  },
  data() {
    return {
      currentPage: 1,
      page_count: 0,
      total_items: 0,
      records: [],
      showPicker: false,
      fieldValue: null,
      oder_by: null,
      order: null
    }
  },
  methods: {
    onPageChange() {
      this.loadRecords()
    },
    loadRecords() {
      let body = {
        page: this.currentPage,
        items_per_page: 10
      }
      if(this.oder_by != null && this.order != null) {
        body.oder_by = this.oder_by
        body.order = this.order
      }
      listOperations(body).then(data => {
        if(data.error) {
          alert('Error')
          return
        }
        this.records = data.data.records
        this.page_count = data.data.total_pages
        this.total_items = data.data.total_records
      })
    },
    onConfirm ({ selectedOptions }) {
      this.currentPage = 1
      this.showPicker = false;
      this.oder_by = selectedOptions[0].value
      this.order = selectedOptions[1].value
      this.loadRecords()
      this.fieldValue = `${selectedOptions[0].text} - ${selectedOptions[1].text}`;
    },
    deleteRecord(id) {
      showConfirmDialog({
        title: 'Atention',
        message: 'Are you sure you want to delete this record?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      })
      .then(() => {
        console.log(`Deleting ${id}`)
        deleteOperation(id).then(data => {
          this.loadRecords()
          if(data.error) {
            showDialog({
              title: 'Ups...',
              message: data.message,
              confirmButtonText: 'Ok'
            })
            return
          }
          showDialog({
              title: 'Done',
              message: 'Deleted successfully',
              confirmButtonText: 'Ok'
          })
  
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
                    <van-button type="primary" to="home">Calculator</van-button>
                </van-col>
                <van-col span="8">
                    <van-button type="danger">Logout</van-button>
                </van-col>
            </van-row>
        </template>
    </van-nav-bar>

    <h1>Records</h1>

    <van-field
      v-model="fieldValue"
      is-link
      readonly
      label="Order"
      placeholder="Choose ordering type"
      @click="showPicker = true"
    />

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker 
        title="Order" 
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm" 
      />
    </van-popup>


      <van-row>
        <van-col span="4">Operation</van-col>
        <van-col span="4">Result</van-col>
        <van-col span="4">Cost</van-col>
        <van-col span="4">Balance</van-col>
        <van-col span="4">Delete</van-col>
      </van-row>
      <br/>
    
      <van-row v-for="record in records" :key="record.id">
        <van-col span="4">{{ record.operation_id }}</van-col>
        <van-col span="4">{{ record.operation_response }}</van-col>
        <van-col span="4">{{ record.amount }}</van-col>
        <van-col span="4">{{ record.user_balance }}</van-col>
        <van-col span="4">
          <van-button type="danger" @click="deleteRecord(record.id)">Delete</van-button>
        </van-col>
      </van-row>
    <van-pagination 
      v-model="currentPage" 
      :page-count="page_count"
      :total-items="total_items" 
      mode="simple"
      @change="onPageChange"
    />


      
  </main>
</template>

<style scoped>

</style>
