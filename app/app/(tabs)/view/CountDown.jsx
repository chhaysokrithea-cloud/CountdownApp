import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

export default function CountDown() {
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [weeks, setWeeks] = useState('0');
  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('1');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [remainingMs, setRemainingMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const endTimeRef = useRef(0);
  const intervalRef = useRef(null);

  function handleNumericChange(setter, text) {
    const filtered = text.replace(/[^0-9]/g, '').slice(0, 3);
    setter(filtered);
  }

  function startCountdown() {
    const yearsValue = Number(years) || 0;
    const monthsValue = Number(months) || 0;
    const weeksValue = Number(weeks) || 0;
    const daysValue = Number(days) || 0;
    const hoursValue = Number(hours) || 0;
    const minutesValue = Number(minutes) || 0;
    const secondsValue = Number(seconds) || 0;

    const YEAR_MS = 29030400000; // 12 x 4-week months
    const MONTH_MS = 2419200000; // 4 weeks
    const WEEK_MS = 604800000;
    const DAY_MS = 86400000;
    const HOUR_MS = 3600000;
    const MINUTE_MS = 60000;
    const SECOND_MS = 1000;

    const durationMs =
      yearsValue * YEAR_MS +
      monthsValue * MONTH_MS +
      weeksValue * WEEK_MS +
      daysValue * DAY_MS +
      hoursValue * HOUR_MS +
      minutesValue * MINUTE_MS +
      secondsValue * SECOND_MS;

    if (durationMs <= 0) {
      return;
    }

    endTimeRef.current = Date.now() + durationMs;
    setRemainingMs(durationMs);
    setIsRunning(true);
  }

  function stopCountdown() {
    setIsRunning(false);
  }

  function resetCountdown() {
    setIsRunning(false);
    setRemainingMs(0);
  }

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      setRemainingMs(remaining);
      if (remaining <= 0) {
        setIsRunning(false);
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  function formatMs(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const totalMillisecond = ms % 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor(totalMillisecond / 10);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
  }


    const [fontsLoaded] = useFonts({
    'Siemreap': require('../../../assets/font/Siemreap.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);




  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onLayout={onLayoutRootView}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>កំណត់ម៉ោង</Text>
        <Text style={styles.description}>សូមជ្រើសរើសពេលខាងក្រោមដើម្បីកំណត់</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>ឆ្នាំ</Text>
          <TextInput
            style={styles.input}
            value={years}
            onChangeText={text => handleNumericChange(setYears, text)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#888"
          />
        </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>ខែ</Text>
        <TextInput
          style={styles.input}
          value={months}
          onChangeText={text => handleNumericChange(setMonths, text)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>សប្តាហ៍</Text>
        <TextInput
          style={styles.input}
          value={weeks}
          onChangeText={text => handleNumericChange(setWeeks, text)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>ថ្ងៃ</Text>
        <TextInput
          style={styles.input}
          value={days}
          onChangeText={text => handleNumericChange(setDays, text)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>ម៉ោង</Text>
        <TextInput
          style={styles.input}
          value={hours}
          onChangeText={text => handleNumericChange(setHours, text)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>នាទី</Text>
        <TextInput
          style={styles.input}
          value={minutes}
          onChangeText={text => handleNumericChange(setMinutes, text)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>វិនាទី</Text>
        <TextInput
          style={styles.input}
          value={seconds}
          onChangeText={text => handleNumericChange(setSeconds, text)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startCountdown}>
        <Text style={styles.buttonText}>ចាប់ផ្តើម</Text>
      </TouchableOpacity>

      <View style={styles.timerBox}>
        <Text style={styles.timerLabel}>Time Remaining</Text>
        <Text style={styles.timerText}>{formatMs(remainingMs)}</Text>
        <Text style={styles.statusText}>{isRunning ? 'Running' : remainingMs === 0 ? 'Stopped' : 'Paused'}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.controlButton, styles.stopButton]} onPress={stopCountdown}>
          <Text style={styles.buttonText}>ឈប់</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetCountdown}>
          <Text style={styles.buttonText}>សម្អាត</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
     fontFamily:"Siemreap"
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
     fontFamily:"Siemreap"
  },
  inputRow: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 6,
     fontFamily:"Siemreap"
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    color: '#111',
    backgroundColor: '#F5F9FF',
  },
  startButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 22,
     fontFamily:"Siemreap"
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#D64545',
    marginRight: 10,
     fontFamily:"Siemreap"
  },
  resetButton: {
    backgroundColor: '#888',
    marginLeft: 10,
     fontFamily:"Siemreap"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
     fontFamily:"Siemreap"
  },
  timerBox: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#EFF5FF',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
     fontFamily:"Siemreap"
  },
  timerText: {
    fontSize: 44,
    fontWeight: '700',
    color: '#1A237E',
     fontFamily:"Siemreap"
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
     fontFamily:"Siemreap"
  },
});
