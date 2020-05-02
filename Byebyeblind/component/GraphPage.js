import React, { Component } from 'react';
import {
    Platform, AppRegistry, FlatList, StyleSheet, Text, View, Image,
    TouchableOpacity, PanResponder, Button, Dimensions, UIManager, findNodeHandle
} from 'react-native';

import {
    VictoryBar, VictoryAnimation, VictoryStack, VictoryChart,
    VictoryLine, VictoryScatter, VictoryArea, VictoryAxis, VictoryBoxPlot,
    VictoryContainer, VictoryBrushContainer, VictoryClipContainer, VictoryGroup,
    VictoryLegend, VictoryPie, VictoryTheme, VictoryLabel, VictoryVoronoiContainer,
    VictoryTooltip, VictoryZoomContainer, Chart, VictoryCursorContainer, round
} from "victory-native";
import { RGBA_ASTC_10x5_Format, Line } from 'three';

const dataTest =
    [
        { x: new Date(2000, 1, 10), y: 125 },
        { x: new Date(2001, 2, 11), y: 257 },
        { x: new Date(2002, 3, 15), y: 345 },
        { x: new Date(2003, 4, 16), y: 515 },
        { x: new Date(2004, 2, 24), y: 200 },
        { x: new Date(2005, 8, 1), y: 100 },
        { x: new Date(2006, 9, 2), y: 123 },
        { x: new Date(2007, 11, 3), y: 191 },
        { x: new Date(2008, 12, 4), y: 555 },
        { x: new Date(2009, 5, 7), y: 632 },
        { x: new Date(2010, 6, 20), y: 112 },
        { x: new Date(2015, 7, 22), y: 90 },
        { x: new Date(2016, 8, 21), y: 175 },
        { x: new Date(2017, 3, 26), y: 189 },
        { x: new Date(2018, 4, 30), y: 344 },
        { x: new Date(2019, 8, 24), y: 349 },
        { x: new Date(2020, 1, 11), y: 178 },
        { x: new Date(2020, 2, 12), y: 231 }
    ]


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
                // The X,Y position of the touch, relative to the root element
                // console.log(`page_x: ${ev.nativeEvent.pageX}`);
                // console.log(`page_y: ${ev.nativeEvent.pageY}`);

                // The X,Y position of the touch, relative to the element
                // console.log(`location_x: ${ev.nativeEvent.locationX}`);
                // console.log(`location_y: ${ev.nativeEvent.locationY}`);

                // The node id of the element receiving the touch event
                // console.log(`target: ${ev.nativeEvent.target}`);
            },
        });
    }

    //ขนาดหน้าจอโทรศัพท์ที่ใช้เทส width:731, height:411
    render() {

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
                    <Text>{this.props.answer}</Text>
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

                    <VictoryChart
                        events={[{
                            childName: "line",
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        childName: "line",
                                        mutation: (props) => {
                                            const fill = props.style.fill;
                                            return fill === "#030303" ? null : { style: { fill: "#030303" } };
                                        }
                                    }];
                                }
                            }
                        }]}
                        padding={{ top: 22, bottom: 30, left: 45, right: 11 }}
                        width={700}
                        height={205}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer responsive={false}
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={this.handleZoom.bind(this)}
                            />
                        }
                    >

                        <VictoryLine
                            name="line"
                            data={dataTest}
                            style={{
                                data: { stroke: "tomato" }
                            }}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            interpolation="linear"
                            containerComponent={
                                <VictoryCursorContainer
                                    cursorDimension="x"
                                    cursorLabel={({ datum }) => `${round(datum.x, 2)}, ${round(datum.y, 2)}`}
                                />
                            }
                        />


                        <VictoryScatter
                            name="scatter"
                            data={dataTest}
                            size={5}
                            style={{
                                data: { fill: "#c43a31" }
                            }}
                            labels={({ datum }) => datum.y}
                        />


                    </VictoryChart>

                </View>

                <View>
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
        //backgroundColor: '#01273C'
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