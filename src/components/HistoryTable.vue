<template>
   <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, index) of records" :key="record.id">
            <td>{{index + 1}}</td>
            <td>{{$filters.currencyFormat(record.amount)}}</td>
            <td>{{$filters.dateTimeFormat(record.date, 'datetime')}}</td>
            <td>{{record.categoryName}}</td>
            <td>
              <span
              class="white-text badge red"
              :class="[record.typeClass]"
              >{{record.typeText}}</span>
            </td>
            <td>
              <button
              class="btn-small btn"
              @click="$router.push('/detail/' + record.id)"
              v-tooltip="'Перейти к записи'"
              >
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {

   props: {
      records: {
         required: true,
         type: Array
      }
   }

}
</script>

<style>

</style>