import React, { Component } from "react";
import Header from "../components/layouts/header";

const data = {
  name: 'Lam',
  age: '23'
}
const passing = (data) => {
  console.log(data)
 
}
class AboutComponent extends Component {
  render() {
    return(
      <div>
        <Header> </Header>
        <h1 className="text-center">About</h1>
      </div>
    );
  }
}
<script>
  
</script>
export default AboutComponent