import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    autoCorrect?: boolean;
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    value?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    maxLength?: number;
    multiline?: boolean;
    textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined
    lightColor?: string;
    darkColor?: string;
};

export function ThemedInput({
    autoCorrect,
    onChange,
    value,
    placeholder,
    placeholderTextColor,
    maxLength,
    multiline,
    textAlignVertical,
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
            maxLength={maxLength}
            multiline={multiline}
            textAlignVertical={textAlignVertical}
            style={[
                { color },
                style,

            ]}
            {...rest}
        />
    );
}
