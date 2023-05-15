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

  const handleChange = (pos: number, neu: number, neg: number, que: number) => {
    const sum = pos + neu + neg + que;
    const diff = 100 - sum;

    if (diff !== 0) {
      const nonZeroParams =
        (pos !== 0 ? 1 : 0) +
        (neu !== 0 ? 1 : 0) +
        (neg !== 0 ? 1 : 0) +
        (que !== 0 ? 1 : 0);

      const ratio = diff / nonZeroParams;

      setPositive(pos);
      setNeutral(neu !== 0 || ratio > 0 ? Math.floor(neu + ratio) : 0);
      setNegative(neg !== 0 || ratio > 0 ? Math.floor(neg + ratio) : 0);
      setQuestions(que !== 0 || ratio > 0 ? Math.floor(que + ratio) : 0);
    }
  };

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
            value={positive}
            onChange={(event: Event, value: number | number[]) =>
              handleChange(value as number, neutral, negative, questions)
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
            value={neutral}
            onChange={(event: Event, value: number | number[]) =>
              handleChange(positive, value as number, negative, questions)
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
            value={negative}
            onChange={(event: Event, value: number | number[]) =>
              handleChange(positive, neutral, value as number, questions)
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
            value={questions}
            onChange={(event: Event, value: number | number[]) =>
              handleChange(positive, neutral, negative, value as number)
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
            value={emoji}
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
