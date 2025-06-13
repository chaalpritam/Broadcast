import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useWalletXMTP } from '../hooks';

const WalletsScreen = () => {
    const { wallet, connectWallet, disconnectWallet, fetchBalance } = useWalletXMTP();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectMetaMask = async () => {
        setIsConnecting(true);
        try {
            await connectWallet('metamask');
            Alert.alert('Success', 'Connected to MetaMask!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to connect to MetaMask');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleConnectWalletConnect = async () => {
        setIsConnecting(true);
        try {
            await connectWallet('walletconnect');
            Alert.alert('Success', 'Connected to WalletConnect!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to connect to WalletConnect');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnectWallet();
            Alert.alert('Success', 'Wallet disconnected!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to disconnect wallet');
        }
    };

    const handleRefreshBalance = async () => {
        try {
            await fetchBalance();
            Alert.alert('Success', 'Balance refreshed!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to refresh balance');
        }
    };

    const formatAddress = (address: string) => {
        if (!address || address.length < 8) return 'Invalid Address';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Wallet Connection Section */}
            <View style={styles.walletSection}>
                <Text style={styles.sectionTitle}>Wallet Connection</Text>
                
                {/* Connection Status */}
                <View style={styles.statusCard}>
                    <View style={styles.statusRow}>
                        <Icon 
                            name={wallet.isConnected ? "checkmark-circle" : "close-circle"} 
                            size={24} 
                            color={wallet.isConnected ? COLORS.success : COLORS.error} 
                        />
                        <Text style={[styles.statusText, { color: wallet.isConnected ? COLORS.success : COLORS.error }]}>
                            {wallet.isConnected ? 'Connected' : 'Not Connected'}
                        </Text>
                    </View>
                    
                    {wallet.isConnected && wallet.address && (
                        <Text style={styles.addressText}>
                            Address: {formatAddress(wallet.address)}
                        </Text>
                    )}
                    
                    {wallet.isConnected && wallet.balance && (
                        <Text style={styles.balanceText}>
                            Balance: {wallet.balance} ETH
                        </Text>
                    )}
                </View>

                {/* Connection Buttons */}
                {!wallet.isConnected ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.metamaskButton]}
                            onPress={handleConnectMetaMask}
                            disabled={isConnecting}
                        >
                            {isConnecting ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ) : (
                                <Icon name="wallet-outline" size={20} color={COLORS.white} />
                            )}
                            <Text style={styles.buttonText}>
                                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.button, styles.walletconnectButton]}
                            onPress={handleConnectWalletConnect}
                            disabled={isConnecting}
                        >
                            {isConnecting ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ) : (
                                <Icon name="qr-code-outline" size={20} color={COLORS.white} />
                            )}
                            <Text style={styles.buttonText}>
                                {isConnecting ? 'Connecting...' : 'Connect WalletConnect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.refreshButton]}
                            onPress={handleRefreshBalance}
                        >
                            <Icon name="refresh-outline" size={20} color={COLORS.primary} />
                            <Text style={[styles.buttonText, { color: COLORS.primary }]}>
                                Refresh Balance
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.button, styles.disconnectButton]}
                            onPress={handleDisconnect}
                        >
                            <Icon name="log-out-outline" size={20} color={COLORS.error} />
                            <Text style={[styles.buttonText, { color: COLORS.error }]}>
                                Disconnect
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Error Display */}
                {wallet.error && (
                    <View style={styles.errorCard}>
                        <Icon name="warning-outline" size={20} color={COLORS.error} />
                        <Text style={styles.errorText}>{wallet.error}</Text>
                    </View>
                )}
            </View>

            {/* Quick Actions Section - Only show when connected */}
            {wallet.isConnected && (
                <View style={styles.actionsSection}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Deposit', 'Deposit functionality coming soon!')}>
                            <Icon name="arrow-down-circle-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.actionButtonText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Withdraw', 'Withdraw functionality coming soon!')}>
                            <Icon name="arrow-up-circle-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.actionButtonText}>Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Swap', 'Swap functionality coming soon!')}>
                            <Icon name="swap-horizontal-outline" size={24} color={COLORS.primary} />
                            <Text style={styles.actionButtonText}>Swap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.padding,
    },
    walletSection: {
        marginBottom: SIZES.padding * 2,
    },
    actionsSection: {
        marginBottom: SIZES.padding * 2,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: SIZES.padding,
    },
    statusCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SIZES.padding,
        marginBottom: SIZES.padding,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    addressText: {
        fontSize: 12,
        color: COLORS.gray,
        marginBottom: 4,
    },
    balanceText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    buttonContainer: {
        gap: SIZES.padding,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: SIZES.padding,
        borderRadius: 8,
        minHeight: 48,
    },
    metamaskButton: {
        backgroundColor: COLORS.primary,
    },
    walletconnectButton: {
        backgroundColor: COLORS.success,
    },
    refreshButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    disconnectButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.error,
    },
    buttonText: {
        fontSize: 14,
        color: COLORS.white,
        fontWeight: '600',
        marginLeft: 8,
    },
    errorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.error + '10',
        borderRadius: 8,
        padding: SIZES.padding,
        marginTop: SIZES.padding,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.error,
    },
    errorText: {
        fontSize: 12,
        color: COLORS.error,
        marginLeft: 8,
        flex: 1,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.padding,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    actionButtonText: {
        fontSize: 10,
        color: COLORS.black,
        marginTop: 8,
        textAlign: 'center',
    },
});

export default WalletsScreen; 