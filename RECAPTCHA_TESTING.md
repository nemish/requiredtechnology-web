# reCAPTCHA Testing Guide

This guide will help you thoroughly test the reCAPTCHA integration in your contact form.

## 🧪 Testing Methods

### 1. **Enable Test Mode (Development Only, Required)**

All debug tooling (`TestModeToggle`, `ReCAPTCHADebug`, the v2 fallback widget)
is loaded through `app/components/DevTools.tsx`, which dynamically imports it
only when `NODE_ENV` is `development` (`pnpm dev`). Production builds never
reference or load these components, and the test-mode cookie exposes nothing
in production.

In development, the panel is additionally hidden behind a cookie. To enable it:

**Option A: Use the Test Mode Toggle**

- Look for the 🧪 button in the bottom-left corner
- Click it to open the test mode controls
- Toggle "Test Mode: ON" to enable the debug panel
- The debug panel button will now appear in the bottom-right corner

**Option B: Set Cookie Manually**
Open your browser's developer console and run:

```javascript
document.cookie =
  "test-recaptcha-enabled=true; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
```

Then refresh the page.

**To Disable Test Mode:**

- Use the toggle in the debug panel, or
- Run in console: `document.cookie = "test-recaptcha-enabled=false; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";`

### 2. **Debug Panel Testing**

Once test mode is enabled:

- Look for the red "Debug reCAPTCHA" button in the bottom-right corner of the page
- Click it to open the debug panel
- The panel shows:
  - Site key configuration
  - reCAPTCHA loading status
  - Last generated token
  - Test results with scores
- Use the "Test reCAPTCHA v3" button to generate tokens and see verification results
- Use the reCAPTCHA v2 checkbox for visible testing

### 3. **Console Logging**

Open your browser's developer console (F12) to see detailed logs:

- 🔐 Token generation logs
- 📊 Verification response details
- ✅/❌ Success/failure indicators
- 📧 Form submission tracking

### 4. **Network Tab Monitoring**

In your browser's developer tools:

- Go to Network tab
- Submit the contact form
- Look for requests to `/api/send`
- Check the response for reCAPTCHA scores and details

## 🔑 Setting Up Test Keys

### Google's Test Keys (Always Work)

For immediate testing without setting up your own keys:

```env
# Test keys that always return score 0.9 (passing)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

### Your Own Test Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site:
   - **Label**: "Required Technology Test"
   - **reCAPTCHA type**: reCAPTCHA v3
   - **Domains**: Add `localhost:3000` and your production domain
3. Copy the Site Key and Secret Key to your `.env.local`

## 🎯 Testing Scenarios

### Scenario 1: Normal User Behavior

1. Fill out the contact form normally
2. Submit the form
3. Check console logs for score (should be 0.7-1.0)
4. Verify email is sent successfully

### Scenario 2: Suspicious Behavior

1. Use browser automation tools or scripts
2. Submit form very quickly multiple times
3. Check console logs for lower scores (0.1-0.6)
4. Verify that low-score submissions are blocked

### Scenario 3: No reCAPTCHA Token

1. Disable JavaScript or block reCAPTCHA scripts
2. Try to submit the form
3. Check that submission is handled gracefully

### Scenario 4: Invalid Token

1. Manually modify the reCAPTCHA token in network requests
2. Submit the form
3. Verify that invalid tokens are rejected

## 📊 Understanding Scores

reCAPTCHA v3 scores range from 0.0 (very likely a bot) to 1.0 (very likely human):

- **0.9 - 1.0**: Very likely human ✅
- **0.7 - 0.8**: Likely human ✅
- **0.5 - 0.6**: Neutral (current threshold) ⚠️
- **0.3 - 0.4**: Likely bot ❌
- **0.0 - 0.2**: Very likely bot ❌

## 🛠️ Debug Panel Features

The debug panel provides real-time information:

- **Site Key**: Shows if your reCAPTCHA key is configured
- **Status**: Indicates if reCAPTCHA is loaded and ready
- **Last Token**: Shows the most recent token (truncated for security)
- **Last Score**: Displays the score from the last verification
- **Test Button**: Generates a new token and tests it
- **Recent Tests**: History of test results with timestamps

## 🚨 Common Issues & Solutions

### Issue: "reCAPTCHA not ready"

**Solution**: Wait a moment for the script to load, or refresh the page

### Issue: "reCAPTCHA verification failed"

**Solutions**:

- Check your secret key in environment variables
- Verify the domain matches your reCAPTCHA configuration
- Check console for detailed error messages

### Issue: Low scores from legitimate users

**Solutions**:

- Lower the score threshold (currently 0.5)
- Implement additional verification methods
- Monitor and adjust based on user feedback

### Issue: Debug panel not appearing

**Solutions**:

- Make sure you are running the dev server (`pnpm dev`) — the tooling is
  excluded from production builds
- Verify the test-mode cookie is enabled (🧪 toggle, bottom-left)
- Check browser console for errors

## 🔍 Advanced Testing

### Manual Token Testing

You can test tokens manually using curl:

```bash
curl -X POST https://www.google.com/recaptcha/api/siteverify \
  -d "secret=YOUR_SECRET_KEY&response=TOKEN_HERE"
```

### Score Threshold Testing

Modify the threshold in `/app/api/send/route.ts`:

```typescript
const isValid = data.success && data.score >= 0.3; // Lower threshold
```

### Different Actions Testing

Test different action names:

```typescript
const token = await getRecaptchaToken("contact_form_submit");
const token = await getRecaptchaToken("newsletter_signup");
const token = await getRecaptchaToken("login_attempt");
```

## 📝 Production Considerations

1. **Debug Panel**: excluded from production automatically — `DevTools` only
   dynamically imports it in development, so nothing needs removing by hand
2. **Monitor Logs**: Set up logging to track reCAPTCHA performance
3. **Score Analytics**: Monitor score distributions to optimize thresholds
4. **Fallback Handling**: Ensure graceful degradation when reCAPTCHA fails

## 🎉 Success Indicators

Your reCAPTCHA integration is working correctly when:

- ✅ Debug panel shows "Loaded" status
- ✅ Form submissions generate tokens
- ✅ Console shows verification logs with scores
- ✅ Legitimate users can submit forms successfully
- ✅ Suspicious behavior is blocked
- ✅ Email notifications are sent for valid submissions

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Test with Google's test keys first
4. Check the reCAPTCHA admin console for domain configuration
