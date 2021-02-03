import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, NativeModules, Vibration } from 'react-native';
import PropTypes from 'prop-types';

const POMODORO_SECONDS = 1500
const SHORT_BREAK_SECONDS = 300
const LONG_BREAK_SECONDS = SHORT_BREAK_SECONDS * 4
const VIBRATE_DURATION_MS = 1000
const INITIAL_STATE = {
  countdownStarted: false,
  totalSeconds: POMODORO_SECONDS,
  iterNo: 0
}

const Title = props => (
  <Text style={styles.header}>{props.title}</Text>
)

Title.propTypes = {
  title: PropTypes.string.isRequired
}

const PomodoroStatus = props => (
  <View style={{ flex: 1 }}>
    <Text style={[styles.text, { color: props.iterNo % 2 === 0 ? 'red' : 'green', textAlign: 'center' }]}>{ props.iterNo % 2 === 0 ? 'Work!' : 'Rest!' }</Text>
    <Text style={styles.text}>Pomodoro count: {Math.floor((props.iterNo + 1) / 2)}</Text>
  </View>
)

PomodoroStatus.propTypes = {
  iterNo: PropTypes.number.isRequired
}

const Countdown = props => (
  <View style={[styles.countdown, styles.container]}>
    <Text style={styles.text}>Time remaining:</Text>
    <Text style={styles.text}>{props.minutes} minutes, {props.seconds} seconds</Text>
  </View>
)

Countdown.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
}

const TimerButton = props => (
  <View style={{ flex: 1 }}>
    <Button title={props.countdownStarted ? 'Reset' : 'Start'} onPress={props.onPress} />
  </View>
)

TimerButton.propTypes = {
  countdownStarted: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
}

export default class extends React.Component {
  state = Object.assign({}, INITIAL_STATE)
  componentWillUnmount = () => {
    if (this.state.countdownStarted)
      clearInterval(this.interval)
  }
  stateTrans = prevState => {
    if (!prevState.countdownStarted)
      throw new Error('stateTrans: Countdown has not started!')
    if (prevState.totalSeconds === 1) {
      const newState = {
	countdownStarted: true,
	iterNo: (prevState.iterNo + 1) % 8
      }
      newState.totalSeconds = newState.iterNo === 7 ?
          LONG_BREAK_SECONDS :
	newState.iterNo % 2 === 0 ?
	  POMODORO_SECONDS:
	  SHORT_BREAK_SECONDS
      Vibration.vibrate(VIBRATE_DURATION_MS)
      return newState
    } else {
      return {
	countdownStarted: true,
	totalSeconds: prevState.totalSeconds - 1,
	iterNo: prevState.iterNo
      }
    }
  }
  toggleCountdown = () => {
    if (this.state.countdownStarted) {
      this.setState(() => Object.assign({}, INITIAL_STATE))
      clearInterval(this.interval)
    } else {
      this.setState(prevState => ({
        countdownStarted: true,
	totalSeconds: prevState.totalSeconds,
	iterNo: prevState.iterNo
      }))
      this.interval = setInterval(() => this.setState(this.stateTrans), 1000)
    }
  }
  render = () => (
    <View style={[styles.topLevel, styles.container]}>
      <Title title="Pomodoro Timer" />
      <PomodoroStatus iterNo={this.state.iterNo} />
      <Countdown minutes={Math.floor(this.state.totalSeconds / 60)} seconds={this.state.totalSeconds % 60} />
      <TimerButton countdownStarted={this.state.countdownStarted} onPress={this.toggleCountdown} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  topLevel: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: NativeModules.StatusBarManager.HEIGHT,
    justifyContent: 'center'
  },
  countdown: {
    flex: 3
  },
  container: {
    alignItems: 'center',
    textAlign: 'center'
  },
  header: {
    flex: 1,
    fontSize: 36,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24
  }
});
