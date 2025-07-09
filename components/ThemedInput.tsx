import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    autoCorrect? : boolean;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>)=>void;
    value?: string;
    placeholder?: string;
    placeholderTextColor?:string;
    lightColor?: string;
    darkColor?: string;
};

export function ThemedInput({
    autoCorrect,
    onChange,
    value,
    placeholder,
    placeholderTextColor,
    style,
    lightColor,
    darkColor,
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TextInput
            autoCorrect={autoCorrect}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            style={[
                { color },
                style,

            ]}
            {...rest}
        />
    );
}
