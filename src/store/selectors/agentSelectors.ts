import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Agent, AgentChat } from '../../types/agent';

// Base selectors
export const selectAgentState = (state: RootState) => state.agent;

export const selectAgents = createSelector(
    [selectAgentState],
    (agentState) => Object.values(agentState.agents) as Agent[]
);

export const selectAgentsLoading = createSelector(
    [selectAgentState],
    (agentState) => agentState.loading.agents
);

export const selectAgentsError = createSelector(
    [selectAgentState],
    (agentState) => agentState.error.agents
);

export const selectSelectedAgentId = createSelector(
    [selectAgentState],
    (agentState) => agentState.selectedAgentId
);

export const selectSelectedAgent = createSelector(
    [selectAgentState, selectSelectedAgentId],
    (agentState, selectedAgentId) => 
        selectedAgentId ? agentState.agents[selectedAgentId] : null
);

export const selectAgentsByCategory = createSelector(
    [selectAgents],
    (agents) => {
        const categorized = agents.reduce((acc: Record<string, Agent[]>, agent: Agent) => {
            if (!acc[agent.category]) {
                acc[agent.category] = [];
            }
            acc[agent.category].push(agent);
            return acc;
        }, {} as Record<string, Agent[]>);
        
        return categorized;
    }
);

export const selectOnlineAgents = createSelector(
    [selectAgents],
    (agents) => agents.filter((agent: Agent) => agent.status === 'online')
);

export const selectAgentsByStatus = createSelector(
    [selectAgents],
    (agents) => {
        const byStatus = agents.reduce((acc: Record<string, Agent[]>, agent: Agent) => {
            if (!acc[agent.status]) {
                acc[agent.status] = [];
            }
            acc[agent.status].push(agent);
            return acc;
        }, {} as Record<string, Agent[]>);
        
        return byStatus;
    }
);

export const selectAgentChats = createSelector(
    [selectAgentState],
    (agentState) => Object.values(agentState.chats) as AgentChat[]
);

export const selectAgentChatsLoading = createSelector(
    [selectAgentState],
    (agentState) => agentState.loading.chats
);

export const selectAgentChatsError = createSelector(
    [selectAgentState],
    (agentState) => agentState.error.chats
);

export const selectSelectedChatId = createSelector(
    [selectAgentState],
    (agentState) => agentState.selectedChatId
);

export const selectSelectedChat = createSelector(
    [selectAgentState, selectSelectedChatId],
    (agentState, selectedChatId) => 
        selectedChatId ? agentState.chats[selectedChatId] : null
);

export const selectChatsByAgent = createSelector(
    [selectAgentChats],
    (chats) => {
        const byAgent = chats.reduce((acc: Record<string, AgentChat[]>, chat: AgentChat) => {
            if (!acc[chat.agentId]) {
                acc[chat.agentId] = [];
            }
            acc[chat.agentId].push(chat);
            return acc;
        }, {} as Record<string, AgentChat[]>);
        
        return byAgent;
    }
); 