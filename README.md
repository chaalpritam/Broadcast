# Broadcast App

Our upcoming app for group chats, designed to enhance the experience of communicating within larger groups. Whether it's for friends, communities, or professional teams.

## Why Broadcast

- typically to replace whatsapp
- where all communities use whatsapp to communicate
- also not depend too much on telegram with overload
- correct the mistakes made by whatsapp channels and communities

## Features

- manage communities like typical web3 communities
- make owners, admin, moderators
- take each messaging into a separate threads to discuss
- disappear status with a set time and reward for watchers
- watchers is a good way for promotion like first 15 mins
- reward the watches with USDC or something thats onchain
- calendar and events section as aravind srinivas said
- it should be rewarding for people to be in the community
- onchain features NFTs, swap, payments, rewards
- sync your farcaster, lens, whatsapp contacts
- embedded wallets or import wallers farcaster & lens
- enable tech to build features for the communities

## Implementation Status

### Communities Feature

The Communities feature has been implemented with the following components:

#### Screens
- **CommunityListScreen**: Displays a list of all communities with search functionality
- **CommunityScreen**: Shows community details, posts, and member interactions
- **CreateCommunityScreen**: Form for creating new communities with name, description, and privacy settings
- **CreatePostScreen**: Interface for creating posts within communities, supporting text and image content

#### State Management
- Redux integration for managing community data, posts, and user interactions
- Async thunks for fetching communities, posts, and comments
- Selectors for efficiently accessing community state

#### Navigation
- Dedicated `CommunityNavigator` for community-related screens
- Integration with the main app navigation via a Communities tab

#### Components
- **CommunityHeader**: Displays community details, cover image, and action buttons
- **CommunityCard**: Card component for displaying community previews in the list
- **CommunityPost**: Component for rendering individual posts with like, comment, and share actions
- **EmptyState**: Reusable component for displaying empty states with appropriate messages

#### Features Implemented
- Viewing communities and posts
- Creating new communities and posts
- Liking posts
- Commenting on posts (UI ready, backend integration pending)
- Pull-to-refresh for updating content
- Search functionality for communities
- Loading states and error handling

#### Pending Features
- Join/leave community functionality (UI ready, backend integration pending)
- Post sharing
- Post options (edit, delete, report)
- Member management (roles, permissions)
- On-chain features (rewards, NFTs, etc.)
- Calendar and events
- Wallet integration

## Getting Started

To run the app locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Tech Stack

- React Native
- Redux Toolkit for state management
- React Navigation for routing
- TypeScript for type safety

