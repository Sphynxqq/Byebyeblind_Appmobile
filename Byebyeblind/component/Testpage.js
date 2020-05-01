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

var x = [], y = [], tableTag = [], answer;

export class Testpage extends Component {
    constructor() {
        super();
        this.state = {
            nPoints: 4,
            X: 4,
        };
    }

    initialValue(X) {
        x = [10, 20, 30, 40]
        y = [125, 257, 345, 515]
        // for (var i = 0; i < this.state.nPoints; i++) {
        //     x[i] = parseFloat(document.getElementById("x" + (i + 1)).value);
        //     y[i] = parseFloat(document.getElementById("y" + (i + 1)).value);
        // }
        answer = this.spline(X, x, y)
        console.log(answer);
    }

    spline(x, xs, ys) {
        var ks = xs.map(function () { return 0 })
        ks = this.getNaturalKs(xs, ys, ks)
        var i = 1;
        while (xs[i] < x) i++;
        var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
        var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
        var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
        var q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
        this.setState({
            showOutputCard: true
        })
        return q;
    }


    getNaturalKs(xs, ys, ks) {
        var n = xs.length - 1;
        var A = this.zerosMat(n + 1, n + 2);

        for (var i = 1; i < n; i++)  // rows
        {
            A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
            A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
            A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
            A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
        }

        A[0][0] = 2 / (xs[1] - xs[0]);
        A[0][1] = 1 / (xs[1] - xs[0]);
        A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

        A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
        A[n][n] = 2 / (xs[n] - xs[n - 1]);
        A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

        return this.solve(A, ks);
    }

    solve(A, ks) {
        var m = A.length;
        for (var k = 0; k < m; k++)  // column
        {
            // pivot for column
            var i_max = 0; var vali = Number.NEGATIVE_INFINITY;
            for (var i = k; i < m; i++) if (A[i][k] > vali) { i_max = i; vali = A[i][k]; }
            this.swapRows(A, k, i_max);

            // for all rows below pivot
            for (i = k + 1; i < m; i++) {
                for (var j = k + 1; j < m + 1; j++)
                    A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
                A[i][k] = 0;
            }
        }
        for (i = m - 1; i >= 0; i--) // rows = columns
        {
            var v = A[i][m] / A[i][i];
            ks[i] = v;
            for (j = i - 1; j >= 0; j--) // rows
            {
                A[j][m] -= A[j][i] * v;
                A[j][i] = 0;
            }
        }
        return ks;
    }

    zerosMat(r, c) {
        var A = [];
        for (var i = 0; i < r; i++) {
            A.push([]);
            for (var j = 0; j < c; j++) A[i].push(0);
        }
        return A;
    }

    swapRows(m, k, l) {
        var p = m[k]; m[k] = m[l]; m[l] = p;
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
                        padding={{ top: 22, bottom: 10, left: 45, right: 11 }}
                        width={700}
                        height={205}
                    >

                        <VictoryLine
                            name="line"
                            data={[
                                { x: new Date(1982, 1, 1), y: 125 },
                                { x: new Date(1987, 1, 1), y: 257 },
                                { x: new Date(1993, 1, 1), y: 345 },
                                { x: new Date(1997, 1, 1), y: 515 }
                            ]}
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
                            data={[
                                { x: new Date(1982, 1, 1), y: 125 },
                                { x: new Date(1987, 1, 1), y: 257 },
                                { x: new Date(1993, 1, 1), y: 345 },
                                { x: new Date(1997, 1, 1), y: 515 }
                            ]}
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
                        <VictoryLine data={[
                            { x: new Date(1982, 1, 1), y: 125 },
                            { x: new Date(1987, 1, 1), y: 257 },
                            { x: new Date(1993, 1, 1), y: 345 },
                            { x: new Date(1997, 1, 1), y: 515 },
                            { x: new Date(2001, 1, 1), y: 132 },
                            { x: new Date(2005, 1, 1), y: 305 },
                            { x: new Date(2011, 1, 1), y: 270 },
                            { x: new Date(2015, 1, 1), y: 470 }
                        ]}
                            style={{
                                data: { stroke: "tomato" }
                            }}

                        />

                        <VictoryScatter data={[
                            { x: new Date(1982, 1, 1), y: 125 },
                            { x: new Date(1987, 1, 1), y: 257 },
                            { x: new Date(1993, 1, 1), y: 345 },
                            { x: new Date(1997, 1, 1), y: 515 },
                            { x: new Date(2001, 1, 1), y: 132 },
                            { x: new Date(2005, 1, 1), y: 305 },
                            { x: new Date(2011, 1, 1), y: 270 },
                            { x: new Date(2015, 1, 1), y: 470 }
                        ]}
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