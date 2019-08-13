<template>
  <div class="user">
    <button>Create User</button>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>agent_id</th>
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
          <td>{{ item.agent_id  }}</td>
          <td>{{ item.username  }}</td>
          <td>{{ item.nick_name  }}</td>
          <td>{{ item.first_name  }}</td>
          <td>{{ item.last_name  }}</td>
          <td>{{ item.create_by  }}</td>
          <td>{{ item.limit.max_order  }}</td>
          <td>{{ item.limit.money_per_day  }}</td>
          <td>{{ item.role  }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: "user",
  data(){
    return{
      items:Array,
      showCreateUserComponent: false,
    }
  },
  components: {
  },
  methods: {
    findAll(){
       axios.get("http://localhost:1323/user", { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}`,'Accept':`application/json`
       }})
        .then(response =>{
          // console.log(response.data)
          if(response.data.success){
            this.items = response.data["data"]
          }
        })
        .catch(err => console.log(err));
    }

  },
  mounted(){
    this.findAll()
  }
};
</script>