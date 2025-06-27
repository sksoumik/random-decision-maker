export interface Option {
  id: string;
  text: string;
  color?: string;
  weight?: number;
}

export interface SpinnerState {
  isSpinning: boolean;
  winner: Option | null;
  options: Option[];
  showCelebration: boolean;
  spinAngle: number;
}

export interface SpinnerConfig {
  duration: number;
  easing: string;
  minSpins: number;
  maxSpins: number;
}

export interface CelebrationConfig {
  duration: number;
  particleCount: number;
  colors: string[];
}

export interface SpinnerProps {
  options: Option[];
  onSpinComplete: (winner: Option) => void;
  config?: Partial<SpinnerConfig>;
  size?: number;
  disabled?: boolean;
}

export interface OptionsManagerProps {
  options: Option[];
  onOptionsChange: (options: Option[]) => void;
  maxOptions?: number;
  minOptions?: number;
}

export interface WinnerAnnouncementProps {
  winner: Option | null;
  isVisible: boolean;
  onClose: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

export type SpinnerStatus = 'idle' | 'spinning' | 'completed' | 'error';

export interface AppState {
  options: Option[];
  currentWinner: Option | null;
  isSpinning: boolean;
  showCelebration: boolean;
  status: SpinnerStatus;
  error: string | null;
}