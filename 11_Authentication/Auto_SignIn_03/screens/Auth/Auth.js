// EL RESTO DEL COMPONENTE FUE RECORTADO
// SOLO MUESTRO LO QUE TIENE QUE VER SON AUTO SIGN IN

class AuthScreen extends Component {
  // PARA EL AUTO SIGN IN
  // ESTO SOLO SE CORRE CUANDO LA APP RE ABRE DESPUES DE CERRRADA TOTALMENTE
  componentDidMount() {
    this.props.onAutoSignIn();
  }
  render() { 
    // #### 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    // PARA EL AUTO SIGN IN
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
