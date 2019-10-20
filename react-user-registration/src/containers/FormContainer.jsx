import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';


class FormContainer extends Component {

  render() {
    return (
      <AvForm>
        <AvField name="name" label="Name" required />
        <AvField name="npi" label="NPI" type="text" validate={{ npi: true }} />
        <AvField name="businessaddress" label="Business Address" required />
        <AvField name="phonenumber" label="Phone number" type="number" max="10" />
        <AvField name="emailaddress" label="Email address" validate={{ email: true }}  />

        <Button color="primary">Submit</Button>
      </AvForm>

    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
}

export default FormContainer;