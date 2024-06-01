import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import md from '@/assets/summary.md';
import './styles.scss';

const Home: FC = () => <ReactMarkdown>{md}</ReactMarkdown>;

export default Home;
