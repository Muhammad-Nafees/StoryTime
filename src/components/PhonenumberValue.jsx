import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../../utils/metrics';
import PhoneInput from 'react-native-phone-number-input';
import { redColor, secondaryTextColor } from '../../../utils/colors';
import ChevronBottomIconTwo from '../../../../assets/icons/ChevronBottomIconTwo';
import CustomError from '../CustomError';

const { width } = Dimensions.get('screen');

const CustomPhoneInput = ({
    label,
    placeholder,
    value,
    error,
    touched,
    phoneInput,
    countryCode,
    setFieldValue,
    setPhoneCode,
}) => {
    const [isValidNumber, setIsValidNumber] = useState('');

    const isError = error && ((touched && !value) || (error && value));

    return (
        <View style={{ gap: 8 }}>
            <Text
                style={{
                    color: secondaryTextColor,
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.038,
                }}>
                {label}
            </Text>
            <PhoneInput
                ref={phoneInput}
                placeholder={placeholder}
                defaultCode={countryCode === undefined ? 'US' : countryCode}
                textInputStyle={styles.input}
                textInputProps={{ placeholderTextColor: 'rgba(22, 26, 29, 0.3)' }}
                codeTextStyle={styles.codeText}
                textContainerStyle={{
                    backgroundColor: 'transparent',
                }}
                containerStyle={[
                    styles.container,
                    { borderBottomColor: isError ? redColor : '#EDEDED' },
                ]}
                flagButtonStyle={styles.flagButton}
                renderDropdownImage={
                    <View style={styles.iconContainer}>
                        <ChevronBottomIconTwo />
                        <View
                            style={[
                                styles.line,
                                {
                                    backgroundColor:
                                        value.length > 0
                                            ? 'rgba(22, 26, 29, 0.9)'
                                            : 'rgba(22, 26, 29, 0.3)',
                                },
                            ]}
                        />
                    </View>
                }
                value={value}
                onChangeText={phoneNumber => {
                    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
                    if (checkValid) {
                        setIsValidNumber('');
                    } else {
                        setIsValidNumber('Invalid Number');
                    }
                    setFieldValue('phone', phoneNumber);
                }}
                onChangeCountry={country => {
                    setPhoneCode(country.callingCode);
                    phoneInput.current?.setState({ number: '' });
                    setFieldValue('phone', '');
                }}
            />
            {(isError || isValidNumber !== '') && (
                <CustomError error={error || isValidNumber} />
            )}
        </View>
    );
};

export default CustomPhoneInput;

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: '100%',
        borderBottomWidth: 1,
    },
    input: {
        width: '40%',
        padding: 0,
        margin: 0,
        color: 'rgba(22, 26, 29, 0.9)',
        fontFamily: 'SpaceGrotesk-Medium',
        fontSize: 13,
    },
    codeText: {
        fontSize: 13,
        marginTop: -verticalScale(5.8),
        marginLeft: -horizontalScale(9),
        marginRight: -horizontalScale(-3),
        fontFamily: 'SpaceGrotesk-Medium',
        color: 'rgba(22, 26, 29, 0.9)',
    },
    flagButton: {
        width: horizontalScale(75),
        marginRight: horizontalScale(-5),
    },
    iconContainer: {
        marginLeft: -6,
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center',
        gap: 6,
    },
    line: { width: 1, height: 20 },
});
