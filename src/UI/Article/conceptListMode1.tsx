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
import TopicTitle from "../../TopicTitle/TopicTitle";
import { Concept } from "./conceptArticle";

interface ConceptListMode1Props {
  conceptList: Concept[];
  handelListenAudio: (audioText: string) => void;
}

const ConceptListMode1: React.FC<ConceptListMode1Props> = ({
  conceptList,
  handelListenAudio,
}) => {
  const theme = useTheme();
  return (
    <List className={`concept-list-wrp ${theme.palette.mode}`} sx={{ mt: 1 }}>
      {conceptList.map((concept, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          className="concept-list-item"
          sx={{ minHeight: 30 }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" component="h4" className="list-head">
                {concept.number && (
                  <Box component="div" className="concept-list-number">
                    {concept.number}
                  </Box>
                )}
                {concept.title && <TopicTitle title={concept.title} />}
              </Typography>
            }
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

export default ConceptListMode1;
