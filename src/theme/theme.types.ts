export interface ChatTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    userBubbleBackground: string;
    assistantBubbleBackground: string;
    userBubbleText: string;
    assistantBubbleText: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  typography: {
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
    fontFamily: string;
  };
}

export const defaultTheme: ChatTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#ffffff',
    text: '#000000',
    userBubbleBackground: '#007AFF',
    assistantBubbleBackground: '#E9ECEF',
    userBubbleText: '#ffffff',
    assistantBubbleText: '#000000'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  typography: {
    fontSize: {
      small: '12px',
      medium: '14px',
      large: '16px'
    },
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }
}

export const appleTheme: ChatTheme = {
  colors: {
    primary: '#007AFF', // iOS blue
    secondary: '#34C759', // iOS green
    background: '#FFFFFF',
    text: '#000000',
    userBubbleBackground: '#007AFF', // iOS blue
    assistantBubbleBackground: '#E9E9EB', // iOS light gray
    userBubbleText: '#FFFFFF',
    assistantBubbleText: '#000000'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '22px' // More rounded corners like iMessage
  },
  typography: {
    fontSize: {
      small: '13px',
      medium: '15px',
      large: '17px'
    },
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif'
  }
}

export const fluentTheme: ChatTheme = {
  colors: {
    primary: '#0078D4', // Microsoft blue
    secondary: '#2B88D8', // Light Microsoft blue
    background: '#FFFFFF',
    text: '#323130', // Fluent UI text color
    userBubbleBackground: '#0078D4',
    assistantBubbleBackground: '#F3F2F1', // Fluent UI light gray
    userBubbleText: '#FFFFFF',
    assistantBubbleText: '#323130'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px' // Fluent UI uses more subtle rounded corners
  },
  typography: {
    fontSize: {
      small: '12px',
      medium: '14px',
      large: '16px'
    },
    fontFamily: '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif'
  }
}