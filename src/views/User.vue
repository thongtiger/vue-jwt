<template>
  <div class="user">
    <button>Create User</button>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>nick_name</th>
          <th>first_name</th>
          <th>last_name</th>
          <th>create_by</th>
          <th>max_order</th>
          <th>money_per_day</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,k) in items" :key="k">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.nick_name }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.create_by }}</td>
          <td>{{ item.limit.max_order }}</td>
          <td>{{ item.limit.money_per_day }}</td>
          <td>{{ item.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from "../store";
// @ is an alias to /src
import axios from "axios";
export default {
  name: "user",
  data() {
    return {
      items: Array,
      showCreateUserComponent: false
    };
  },
  components: {},
  methods: {
    findAll() {
      axios
        .get(store.state.api_url + "/user", {
          headers: {
            Accept: `application/json;`
          }
        })
        .then(response => {
          this.items = response.data;
          // console.log(response.data)
          // if(response.data.success){

          // }
        })
        .catch(error => {
          // Error 😨
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status == 403) {
              this.$router.push('/forbidden')
            }
          }
        });
    }
  },
  mounted() {
    this.findAll();
  }
};
</script>