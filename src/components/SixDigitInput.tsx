import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface SixDigitInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SixDigitInput: React.FC<SixDigitInputProps> = ({ value, onChangeText }) => {
  const [codes, setCodes] = useState<string[]>(['', '', '', '', '', '']);
  const refs = useRef<TextInput[]>([]);

  useEffect(() => {
    setCodes(value.split('').slice(0, 6).concat(Array(6 - value.length).fill('')));
  }, [value]);

  const handleCodeChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newCodes = [...codes];
      newCodes[index] = text;
      setCodes(newCodes);

      const newCode = newCodes.join('').slice(0, 6);
      onChangeText(newCode);

      if (text.length === 1 && index < 5) {
        refs.current[index + 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          key={index}
          ref={(ref) => (refs.current[index] = ref as TextInput)}
          style={styles.input}
          onChangeText={(text) => handleCodeChange(text, index)}
          value={code}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
      
       
      <TouchableOpacity style={styles.delete2faCodeButton} onPress={() => setCodes(Array(6).fill(''))}>
         <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
};

/**/
/**/

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    margin: 5,
  },
  delete2faCodeButton:{
    marginLeft:16
  }
});

export default SixDigitInput;