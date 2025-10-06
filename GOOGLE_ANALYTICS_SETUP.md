# Google Analytics Setup Guide

This project has Google Analytics 4 (GA4) integrated using the recommended `@next/third-parties` library for optimal performance and developer experience.

## Why @next/third-parties?

This implementation uses Next.js's official `@next/third-parties` library, which provides:

- **Better Performance**: Optimized script loading and execution
- **Automatic Optimization**: Built-in performance optimizations
- **Simplified Setup**: Minimal code required for full functionality
- **Future-Proof**: Maintained by the Next.js team
- **Type Safety**: Full TypeScript support

## Setup Instructions

### 1. Get Your Google Analytics Tracking ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use an existing one
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Google Analytics ID:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### 3. Verify Installation

1. Start your development server:

   ```bash
   pnpm dev
   ```

2. Open your browser's developer tools
3. Go to the Network tab
4. Refresh the page
5. Look for requests to `google-analytics.com` or `googletagmanager.com`

## Features Included

### Automatic Page Tracking

- Page views are automatically tracked when users navigate between pages
- Works with Next.js App Router navigation
- Optimized loading with `@next/third-parties` for better performance
- Includes query parameters in tracking

### Custom Event Tracking

You can track custom events using the `event` function:

```typescript
import { event } from "../lib/gtag";

// Track a button click
const handleButtonClick = () => {
  event({
    action: "click",
    category: "engagement",
    label: "contact_form_submit",
    value: 1,
  });
};
```

### Manual Page View Tracking

For programmatic navigation or special cases:

```typescript
import { pageview } from "../lib/gtag";

// Track a custom page view
pageview("/custom-page");
```

## File Structure

```
app/
├── lib/
│   └── gtag.ts                      # Custom event tracking utilities
└── layout.tsx                       # GoogleAnalytics component integration
```

The main Google Analytics functionality is handled by the `@next/third-parties` library, which provides optimized loading and automatic page tracking.

## Privacy Considerations

- Google Analytics is only loaded when `NEXT_PUBLIC_GA_ID` is set
- The implementation follows Google's recommended practices
- Consider implementing cookie consent if required by your jurisdiction

## Testing

### Development Mode

- GA will only load if `NEXT_PUBLIC_GA_ID` is set
- Check browser console for any GA-related errors
- Use Google Analytics DebugView for real-time testing

### Production

- Verify tracking in Google Analytics Real-Time reports
- Check that page views appear in your GA dashboard

## Troubleshooting

### GA Not Loading

1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the environment variable is loaded: `console.log(process.env.NEXT_PUBLIC_GA_ID)`
3. Check browser console for JavaScript errors

### No Data in GA

1. Wait 24-48 hours for data to appear in standard reports
2. Use Real-Time reports to verify immediate tracking
3. Check that your GA property is set up correctly

### TypeScript Errors

If you encounter TypeScript errors related to `window.gtag`, the global type declaration is included in `app/lib/gtag.ts`.

## Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js @next/third-parties Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
- [Next.js Google Analytics Guide](https://nextjs.org/docs/messages/next-script-for-ga)
- [Google Tag Manager](https://tagmanager.google.com/) (alternative approach)
