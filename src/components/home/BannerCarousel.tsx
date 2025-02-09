import React, {useRef, useCallback, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {COLORS, SPACING, FONT_SIZE, BORDER_RADIUS} from '../../styles/common';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = screenWidth;
const ITEM_HEIGHT = 180;
const DOT_SIZE = 8;
const DOT_SPACING = 8;

interface BannerCarouselProps {
  banners: string[];
}

const PROMO_TEXTS = [
  {
    title: '50% OFF',
    subtitle: 'On your first order',
  },
  {
    title: 'Free Delivery',
    subtitle: 'On orders above ₹499',
  },
  {
    title: 'Special Offer',
    subtitle: 'Use code WELCOME20',
  },
  {
    title: 'Flash Sale',
    subtitle: 'Extra 30% off today',
  },
];

export const BannerCarousel = ({banners}: BannerCarouselProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.round(contentOffset / viewSize);
    setCurrentIndex(newIndex);
  };

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    [],
  );

  const renderItem = useCallback(
    ({item: image, index}) => (
      <View style={styles.bannerImageContainer}>
        <Image
          source={{uri: image}}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.promoOverlay}>
          <Text style={styles.promoTitle}>{PROMO_TEXTS[index].title}</Text>
          <Text style={styles.promoSubtitle}>
            {PROMO_TEXTS[index].subtitle}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {banners.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? COLORS.primary : COLORS.gray[200],
              width: index === currentIndex ? DOT_SIZE + 4 : DOT_SIZE,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={banners}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="start"
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
          removeClippedSubviews={true}
        />
      </View>
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT + 30, // Extra space for dots
    marginVertical: SPACING.lg,
  },
  carouselContainer: {
    height: ITEM_HEIGHT,
  },
  bannerImageContainer: {
    width: screenWidth,
    height: ITEM_HEIGHT,
    paddingHorizontal: SPACING.lg,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.lg,
  },
  promoOverlay: {
    position: 'absolute',
    left: SPACING.lg,
    bottom: 0,
    right: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: BORDER_RADIUS.md,
  },
  promoTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  promoSubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light,
    opacity: 0.9,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  dot: {
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginHorizontal: DOT_SPACING / 2,
    backgroundColor: COLORS.gray[200],
  },
});
