import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { Concept } from "./conceptArticle";

interface ConceptListMode2Props {
  conceptList: Concept[];
  handelListenAudio: (audioText: string) => void;
}

const ConceptListMode2: React.FC<ConceptListMode2Props> = ({
  conceptList,
  handelListenAudio,
}) => {
  const theme = useTheme();
  return (
    <List className="concept-list-wrp" sx={{ mt: 1 }}>
      {conceptList.map((concept, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          className="concept-list-item"
        >
          <ListItemText
            secondary={
              <Typography variant="body2" component="p">
                <Box className="block-ele">
                  {concept?.isReadyToListen && (
                    <button
                      className={`listen-audio-btn ${theme.palette.mode}`}
                      onClick={() => {
                        if (concept?.content) {
                          handelListenAudio(concept.content);
                        }
                      }}
                    >
                      <SlowMotionVideoIcon />
                    </button>
                  )}
                  {concept.content}
                </Box>
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ConceptListMode2;
