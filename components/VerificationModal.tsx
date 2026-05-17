import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface VerificationModalProps {
  visible: boolean;
  email?: string;
  onClose: () => void;
  onVerify?: (code: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  error?: string;
}

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
  error,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    // When 6 digits entered, call onVerify if provided, otherwise navigate home
    const run = async () => {
      if (code.length === 6) {
        if (onVerify) {
          await onVerify(code);
        } else {
          setTimeout(() => {
            router.replace("/");
          }, 500);
        }
      }
    };
    run();
  }, [code, onVerify, router]);

  const handleNumberPress = (num: string) => {
    if (code.length < 6) {
      setCode(code + num);
    }
  };

  const handleBackspace = () => {
    setCode(code.slice(0, -1));
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  const numberPad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "backspace"],
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Backdrop */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={handleClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={() => {}}
          >
            {/* Close button */}
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={28} color={colors.textPrimary} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Check your email</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              We&apos;ve sent a verification code to {email ?? "your email"}.
              Enter the 6-digit code below.
            </Text>

            {error ? (
              <Text style={{ color: colors.error, marginBottom: 12 }}>
                {error}
              </Text>
            ) : null}

            {/* Code display */}
            <View style={styles.codeContainer}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View key={index} style={styles.codeDigit}>
                  <Text style={styles.codeDigitText}>{code[index] || ""}</Text>
                  {code[index] && <View style={styles.codeDigitFilled} />}
                </View>
              ))}
            </View>

            {/* Number Pad */}
            <View style={styles.numberPad}>
              {numberPad.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.numberPadRow}>
                  {row.map((num) => (
                    <TouchableOpacity
                      key={num}
                      style={[
                        styles.numberButton,
                        num === "backspace" && styles.numberButtonSpecial,
                      ]}
                      onPress={() =>
                        num === "backspace"
                          ? handleBackspace()
                          : handleNumberPress(num)
                      }
                      activeOpacity={0.7}
                    >
                      {num === "backspace" ? (
                        <Ionicons
                          name="backspace"
                          size={24}
                          color={colors.textPrimary}
                        />
                      ) : (
                        <Text style={styles.numberButtonText}>{num}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                  {row.length === 2 && (
                    <View style={styles.numberButtonPlaceholder} />
                  )}
                </View>
              ))}
            </View>
            <View style={{ marginTop: 18, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => onResend && onResend()}
                activeOpacity={0.7}
              >
                <Text style={{ color: colors.linguaPurple }}>Resend code</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
    fontFamily: "Poppins-SemiBold",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 28,
    lineHeight: 22,
    fontFamily: "Poppins-Regular",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 40,
  },
  codeDigit: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  codeDigitFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.linguaPurple,
    position: "absolute",
  },
  codeDigitText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
  },
  numberPad: {
    gap: 12,
  },
  numberPadRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  numberButtonSpecial: {
    backgroundColor: colors.surface,
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
  },
  numberButtonPlaceholder: {
    width: 70,
  },
});
