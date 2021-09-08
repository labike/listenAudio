/*
 * @Author: your name
 * @Date: 2021-09-07 10:08:14
 * @LastEditTime: 2021-09-08 09:07:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/components/Input.tsx
 */
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {FieldInputProps, FormikProps} from 'formik';

interface IProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

class Input extends React.Component<IProps> {
  render() {
    const {form, field, ...rest} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          {...rest}
          onChangeText={form.handleChange(field.name)}
          onBlur={form.handleBlur(field.name)}
          value={form.values[field.name]}
        />
        <View style={styles.error}>
          <Text>{form.touched[field.name] && form.errors[field.name]}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  error: {
    position: 'absolute',
    marginTop: 5,
    fontSize: 12,
    marginLeft: 10,
    color: '#888',
  },
});

export default Input;
