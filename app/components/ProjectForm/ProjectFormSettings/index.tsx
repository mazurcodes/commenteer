import { useState } from 'react';
import styles from './index.module.scss';
import { Box, Slider } from '@mui/material';

const defaultSettings = {
  positive: 80,
  neutral: 10,
  negative: 5,
  questions: 5,
  emoji: 2,
};

const ProjectFormSettings = () => {
  const [positive, setPositive] = useState(defaultSettings.positive);
  const [neutral, setNeutral] = useState(defaultSettings.neutral);
  const [negative, setNegative] = useState(defaultSettings.negative);
  const [questions, setQuestions] = useState(defaultSettings.questions);
  const [emoji, setEmoji] = useState(defaultSettings.emoji);

  return (
    <div className={styles.wrapper}>
      {/* positive */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.positiveColor}>Positive</h3>
          <span>{positive}%</span>
        </div>
        <Box width="100%">
          <Slider
            size="small"
            defaultValue={positive}
            aria-label="positive"
            valueLabelDisplay="off"
            min={0}
            max={100}
            onChange={(event: Event, value: number | number[]) =>
              setPositive(value as number)
            }
          />
        </Box>
      </div>

      {/* neutral */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.neutralColor}>Neutral</h3>
          <span>{neutral}%</span>
        </div>
        <Box width="100%">
          <Slider
            size="small"
            defaultValue={neutral}
            aria-label="neutral"
            valueLabelDisplay="off"
            min={0}
            max={100}
            onChange={(event: Event, value: number | number[]) =>
              setNeutral(value as number)
            }
          />
        </Box>
      </div>

      {/* negative */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.negativeColor}>Negative</h3>
          <span>{negative}%</span>
        </div>
        <Box width="100%">
          <Slider
            size="small"
            defaultValue={negative}
            aria-label="negative"
            valueLabelDisplay="off"
            min={0}
            max={100}
            onChange={(event: Event, value: number | number[]) =>
              setNegative(value as number)
            }
          />
        </Box>
      </div>

      {/* questions */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.questionsColor}>Questions</h3>
          <span>{questions}%</span>
        </div>
        <Box width="100%">
          <Slider
            size="small"
            defaultValue={questions}
            aria-label="questions"
            valueLabelDisplay="off"
            min={0}
            max={100}
            onChange={(event: Event, value: number | number[]) =>
              setQuestions(value as number)
            }
          />
        </Box>
      </div>

      {/* emoji */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.emojiColor}>Emoji</h3>
          <span>{emoji}%</span>
        </div>
        <Box width="100%">
          <Slider
            size="small"
            defaultValue={emoji}
            aria-label="emoji"
            valueLabelDisplay="off"
            min={0}
            max={5}
            onChange={(event: Event, value: number | number[]) =>
              setEmoji(value as number)
            }
          />
        </Box>
      </div>
    </div>
  );
};

export default ProjectFormSettings;
