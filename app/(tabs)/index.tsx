import { Box } from "@/components/ui/box";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView, View, KeyboardAvoidingView, Platform, ActionSheetIOS, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MODEL_LIST } from "@/constants/models";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function HomeScreen() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m your AI assistant. How can I help you today?',
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const modelNames = Object.keys(MODEL_LIST);

    const showActionSheet = () => {
        const options = ['Image Upload', 'Select Model', 'Cancel'];
        const cancelButtonIndex = 2;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        handleImageUpload();
                    } else if (buttonIndex === 1) {
                        showModelSelection();
                    }
                }
            );
        } else {
            Alert.alert(
                'Select Action',
                '',
                [
                    { text: 'Image Upload', onPress: handleImageUpload },
                    { text: 'Select Model', onPress: showModelSelection },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        }
    };

    const handleImageUpload = () => {
        Alert.alert('Image Upload', 'Image upload feature coming soon!');
    };

    const showModelSelection = () => {
        const modelOptions = [...modelNames, 'Cancel'];
        const cancelButtonIndex = modelOptions.length - 1;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: modelOptions,
                    cancelButtonIndex,
                },
                (buttonIndex) => {
                    if (buttonIndex !== cancelButtonIndex) {
                        setSelectedModel(modelNames[buttonIndex]);
                    }
                }
            );
        } else {
            Alert.alert(
                'Select Model',
                '',
                [
                    ...modelNames.map(model => ({
                        text: model,
                        onPress: () => setSelectedModel(model)
                    })),
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            // Stop recording
            setIsRecording(false);
            setInputText(prev => prev + ' [Voice input simulated]');
            Alert.alert('Voice Recording', 'Voice recording stopped. Text added to input.');
        } else {
            // Start recording
            setIsRecording(true);
            Alert.alert('Voice Recording', 'Voice recording started...');
        }
    };

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: 'I understand your message. This is a simulated response from the AI assistant.',
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);

        // Scroll to bottom
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-4 py-2 border-b border-slate-100">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity>
                        <Ionicons name="menu" size={22} color="#64748B" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="font-semibold text-base text-slate-800">Chat</Text>
                        <Text className="text-xs text-slate-500">
                            {selectedModel || 'Model not found'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowSettings(true)}>
                        <Ionicons name="settings" size={22} color="#64748B" />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* Messages */}
                <ScrollView 
                    ref={scrollViewRef}
                    className="flex-1 px-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 12 }}
                >
                    {messages.map((message) => (
                        <View key={message.id} className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}>
                            <View className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                                message.isUser 
                                    ? 'bg-blue-500 rounded-br-md' 
                                    : 'bg-slate-100 rounded-bl-md'
                            }`}>
                                <Text className={`text-sm leading-5 ${
                                    message.isUser ? 'text-white' : 'text-slate-800'
                                }`}>
                                    {message.text}
                                </Text>
                            </View>
                            <Text className="text-xs text-slate-400 mt-1 px-1">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Input Area */}
                <View className="px-4 py-2 border-t border-slate-100">
                    <View className="flex-row items-center gap-2">
                        {/* Plus button */}
                        <TouchableOpacity 
                            onPress={showActionSheet}
                            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
                        >
                            <Ionicons name="add" size={20} color="#64748B" />
                        </TouchableOpacity>
                        
                        {/* Input field with mic */}
                        <View className="flex-1 flex-row items-center bg-slate-50 rounded-full px-4 py-2">
                            <TextInput
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Type a message..."
                                placeholderTextColor="#94A3B8"
                                className="flex-1 text-base py-2 text-slate-800"
                                multiline
                                maxLength={1000}
                                onSubmitEditing={sendMessage}
                                returnKeyType="send"
                            />
                            
                            {/* Mic button */}
                            <TouchableOpacity 
                                onPress={toggleRecording}
                                className={`mr-2 w-8 h-8 rounded-full items-center justify-center ${
                                    isRecording ? 'bg-red-500' : 'bg-transparent'
                                }`}
                            >
                                <Ionicons 
                                    name={isRecording ? "stop" : "mic"} 
                                    size={16} 
                                    color={isRecording ? "white" : "#64748B"} 
                                />
                            </TouchableOpacity>
                            
                            {/* Send button */}
                            <TouchableOpacity 
                                onPress={sendMessage}
                                disabled={inputText.trim() === ''}
                                className={`w-8 h-8 rounded-full items-center justify-center ${
                                    inputText.trim() === '' ? 'bg-slate-300' : 'bg-blue-500'
                                }`}
                            >
                                <Ionicons 
                                    name="send" 
                                    size={16} 
                                    color="white" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {/* Settings Modal */}
            <Modal
                visible={showSettings}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <SafeAreaView className="flex-1 bg-white">
                    <View className="px-4 py-3 border-b border-slate-100">
                        <View className="flex-row justify-between items-center">
                            <Text className="font-semibold text-lg text-slate-800">Settings</Text>
                            <TouchableOpacity onPress={() => setShowSettings(false)}>
                                <Ionicons name="close" size={24} color="#64748B" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <ScrollView className="flex-1">
                        <View className="px-4 py-6">
                            {/* Account Section */}
                            <Text className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wide">Account</Text>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="mail" size={20} color="#64748B" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-base text-slate-800">Email</Text>
                                    <Text className="text-sm text-slate-500">user@example.com</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="card" size={20} color="#64748B" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-base text-slate-800">Subscription</Text>
                                    <Text className="text-sm text-slate-500">Free Plan</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            
                            {/* App Section */}
                            <Text className="text-xs text-slate-400 font-medium mb-3 mt-6 uppercase tracking-wide">App</Text>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="color-palette" size={20} color="#64748B" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-base text-slate-800">Color Scheme</Text>
                                    <Text className="text-sm text-slate-500">System</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="notifications" size={20} color="#64748B" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-base text-slate-800">Notifications</Text>
                                </View>
                                <View className="w-12 h-6 bg-green-500 rounded-full justify-center">
                                    <View className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5" />
                                </View>
                            </TouchableOpacity>
                            
                            {/* About Section */}
                            <Text className="text-xs text-slate-400 font-medium mb-3 mt-6 uppercase tracking-wide">About</Text>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="help-circle" size={20} color="#64748B" />
                                <Text className="ml-3 text-base text-slate-800 flex-1">Help Center</Text>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="document-text" size={20} color="#64748B" />
                                <Text className="ml-3 text-base text-slate-800 flex-1">Terms of Use</Text>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center py-3 border-b border-slate-100">
                                <Ionicons name="shield-checkmark" size={20} color="#64748B" />
                                <Text className="ml-3 text-base text-slate-800 flex-1">Privacy Policy</Text>
                                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity className="flex-row items-center py-3">
                                <Ionicons name="phone-portrait" size={20} color="#64748B" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-base text-slate-800">App Version</Text>
                                    <Text className="text-sm text-slate-500">1.0.0 (1)</Text>
                                </View>
                            </TouchableOpacity>
                            
                            {/* Logout */}
                            <TouchableOpacity className="flex-row items-center py-3 mt-6">
                                <Ionicons name="log-out" size={20} color="#EF4444" />
                                <Text className="ml-3 text-base text-red-500 flex-1">Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}