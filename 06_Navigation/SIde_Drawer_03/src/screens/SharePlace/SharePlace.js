import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        // PARA EL SIDE DRAWER
        // this.props.navigator.setOnNavigatorEvent( this.MY_METHOD  )
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    // MY_METHOD
    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                // ESTO ABRE EL SIDE DRAWER
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            } 
        }  
    }

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render () {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);