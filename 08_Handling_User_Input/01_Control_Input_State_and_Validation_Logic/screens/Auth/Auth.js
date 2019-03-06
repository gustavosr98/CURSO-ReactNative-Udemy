
class AuthScreen extends Component {
  state = {
    // ESTO ES DEL RESPONSIVE
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",

    // CONTROLS PARA LLEVAR EL CONTROL DE TODOS LOS INPUTS
    /*
      EL FORMATO QUE EL RECOMIENDA ES
      controls: {
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true 
          }
        }
    */
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        }
      }
    }
  };

  // METODO GENERICO PARA ACTUALIZAR INPUT
  updateInputState = (key, value) => {
    
    // CONNECTED VALUE PARA CUANDO HAY DOS INPUTS RELACIONADOS
    // POR EJEMPLO password y confirmPassword
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    // ACTUALIZAR EL STATE CON NUEVOS INPUTS
    // Y VALIDAR CADA INPUT EN ATRIBUTO "valid" CON METODO "validate()" de validation.js
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            )
          }
        }
      };
    });
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
          Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>

          {/* ----------------------------------- onChangeText = { (val) => this.updateInputState("email", val) }*/}
          <DefaultInput
            placeholder="Your E-Mail Address"
            style={styles.input}
            value={this.state.controls.email.value}
            onChangeText={val => this.updateInputState("email", val)}
          />

          {/* ----------------------------------- onChangeText = { (val) => this.updateInputState("password", val) }*/}           
          <DefaultInput
            placeholder="Password"
            style={styles.input}
            value={this.state.controls.password.value}
            onChangeText={val => this.updateInputState("password", val)}
          />

          {/* ----------------------------------- onChangeText = { (val) => this.updateInputState("confirmPassword", val) }*/}
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val =>
              this.updateInputState("confirmPassword", val)}
          />
          </View>


          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

export default AuthScreen;
