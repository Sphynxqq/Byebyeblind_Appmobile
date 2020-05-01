import React, { Component } from 'react';
import { Platform, AppRegistry, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, PanResponder, Button } from 'react-native';

import { VictoryBar, VictoryAnimation, VictoryStack, VictoryChart, VictoryLine, VictoryScatter, VictoryArea, VictoryAxis, VictoryBoxPlot, VictoryContainer, VictoryBrushContainer, VictoryClipContainer, VictoryGroup, VictoryLegend, VictoryPie, VictoryTheme, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip, VictoryZoomContainer } from "victory-native";
import { RGBA_ASTC_10x5_Format } from 'three';


export class GraphPage extends Component {

    constructor() {
        super();
        this.state = {};
    }

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // onStartShouldSetResponder: (ev, gs) => true,
            // onResponderGrant: (ev, gs) => true,
            // onResponderMove: (ev, gs) => ture,
            onMoveShouldSetPanResponder: (ev, gs) => true,
            onMoveShouldSetPanResponderCapture: (ev, gs) => true,
            onPanResponderMove: (ev, gs) => {
                // X position relative to the page
                //console.log(e.nativeEvent.pageX);
                console.log(`page_x: ${ev.nativeEvent.pageX}`);
                console.log(`page_y: ${ev.nativeEvent.pageY}`);
                console.log(`location_x: ${ev.nativeEvent.locationX}`);
                console.log(`location_y: ${ev.nativeEvent.locationY}`);
                console.log(`target: ${ev.nativeEvent.target}`);

                // The X position of the touch, relative to the element
                //console.log(e.nativeEvent.positionX);
            },
        });
    }

    onTouchEvent(name, ev) {
        // console.log(`[${name}]`);
        // console.log(`page_x: ${ev.nativeEvent.pageX}`);
        // console.log(`page_y: ${ev.nativeEvent.pageY}`);
        // console.log(`location_x: ${ev.nativeEvent.locationX}`);
        // console.log(`location_y: ${ev.nativeEvent.locationY}`);
        // console.log(`target: ${ev.nativeEvent.target}`);
    }

    render() {

        


        const data = [
            { x: new Date(1982, 1, 1), y: 125 },
            { x: new Date(1987, 1, 1), y: 257 },
            { x: new Date(1993, 1, 1), y: 345 },
            { x: new Date(1997, 1, 1), y: 515 },
            { x: new Date(2001, 1, 1), y: 132 },
            { x: new Date(2005, 1, 1), y: 305 },
            { x: new Date(2011, 1, 1), y: 270 },
            { x: new Date(2015, 1, 1), y: 470 }
        ];

        return (
            <View >
                <View style={styles.setBtnDate}>
                    <Button
                        onPress={() => {
                            alert('You tapped the button DAY');
                        }}
                        title="DAY"
                    />

                    <Button
                        onPress={() => {
                            alert('You tapped the button WEEK');
                        }}
                        title="WEEK"
                    />

                    <Button
                        onPress={() => {
                            alert('You tapped the MONTH');
                        }}
                        title="MONTH"
                    />
                </View>

                <View
                    {...this._panResponder.panHandlers}
                //     onStartShouldSetResponder={(ev) => true}
                //     // onMoveShouldSetResponder={(ev) => false}
                //     onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
                //     // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
                //     onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
                // // onResponderRelease={this.onTouchEvent.bind(this, "onResponderRelease")}
                // // onResponderTerminationRequest={(ev) => true}
                // // onResponderTerminate={this.onTouchEvent.bind(this, "onResponderTerminate")}
                >
                    <VictoryChart height={250} scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer responsive={false}
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={this.handleZoom.bind(this)}
                            />
                        }
                    >
                        <VictoryLine data={data}
                            style={{
                                data: { stroke: "tomato" }
                            }}
                            
                        />

                        <VictoryScatter data={data}
                            size={5}
                            style={{
                                data: { fill: "#c43a31" }
                            }}
                            
                        />

                    </VictoryChart>

                    <View style={styles.cardview}>
                        <View style={styles.displayincard}>
                            <Text>เปิด</Text>
                            <Text>สูงสุด</Text>
                            <Text>ล่าสุด</Text>
                        </View>

                        <View style={styles.displayincard}>
                            <Text>ราคาปิด</Text>
                            <Text>ต่ำสุด</Text>
                            <Text>VOL</Text>
                        </View>

                        <View style={styles.displaynamebank}>
                            <Text>Bangkok Bank</Text>
                        </View>
                    </View>

                    <View style={styles.seticonbtn}>

                        <TouchableOpacity onPress={() => { alert('You tapped the button Voice') }}>
                            <View style={styles.setbtnvoice}>
                                <Image
                                    style={styles.sizeImgbtn}
                                    source={require('../assets/microphone.png')}
                                />
                                <Text style={styles.btnfont}>Voice</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { alert('You tapped the button Favorite') }}>
                            <View style={styles.setbtnfavorite}>
                                <Image
                                    style={styles.sizeImgbtn}
                                    source={require('../assets/star.png')}
                                />
                                <Text style={styles.btnfont}>Favorite</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>






                {/* Not get position X,Y */}
                {/* <View>
                    <VictoryChart width={600} height={350} scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer responsive={false}
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={this.handleZoom.bind(this)}
                            />
                        }
                    >
                        <VictoryLine data={data}
                            style={{
                                data: { stroke: "tomato" }
                            }}

                        />

                        <VictoryScatter data={data}
                            size={5}
                            style={{ data: { fill: "#c43a31" } }}
                        />

                    </VictoryChart>

                    <VictoryChart
                        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                        width={600} height={90} scale={{ x: "time" }}
                        containerComponent={
                            <VictoryBrushContainer responsive={false}
                                brushDimension="x"
                                brushDomain={this.state.selectedDomain}
                                onBrushDomainChange={this.handleBrush.bind(this)}
                            />
                        }
                    >
                        <VictoryAxis
                            tickValues={[
                                new Date(1985, 1, 1),
                                new Date(1990, 1, 1),
                                new Date(1995, 1, 1),
                                new Date(2000, 1, 1),
                                new Date(2005, 1, 1),
                                new Date(2010, 1, 1)
                            ]}
                            tickFormat={(x) => new Date(x).getFullYear()}
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "tomato" }
                            }}
                            data={[
                                { x: new Date(1982, 1, 1), y: 125 },
                                { x: new Date(1987, 1, 1), y: 257 },
                                { x: new Date(1993, 1, 1), y: 345 },
                                { x: new Date(1997, 1, 1), y: 515 },
                                { x: new Date(2001, 1, 1), y: 132 },
                                { x: new Date(2005, 1, 1), y: 305 },
                                { x: new Date(2011, 1, 1), y: 270 },
                                { x: new Date(2015, 1, 1), y: 470 }
                            ]}
                        />
                    </VictoryChart>
                </View> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    setBtnDate: {
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    cardview: {
        marginLeft: 30,
        width: 670,
        height: 55,
        backgroundColor: '#85C1E9'
    },
    displayincard: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    displaynamebank: {
        alignItems: 'center'
    },
    seticonbtn: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        // backgroundColor: '#01273C'
    },
    setbtnvoice: {
        width: 130,
        height: 70,
        backgroundColor: '#FBD1A7',
        marginTop: 10,
        borderRadius: 30,
        marginBottom: 10,
        flexDirection: 'row'
    },
    sizeImgbtn: {
        width: 45,
        height: 45,
        marginLeft: 5,
        marginTop: 10,
    },
    btnfont: {
        width: 130,
        height: 70,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 2,
    },
    setbtnfavorite: {
        width: 130,
        height: 70,
        backgroundColor: '#FBD1A7',
        marginTop: 10,
        borderRadius: 30,
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: 400
    },
});