'use client';

import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Droppable, Draggable, DragDropContext, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

interface KanbanViewProps {
  tickets: Ticket[];
}

const getPriorityColor = (priority: string): 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' => {
  switch (priority) {
    case 'Baixa':
      return 'success';
    case 'Média':
      return 'info';
    case 'Alta':
      return 'warning';
    case 'Crítica':
      return 'error';
    default:
      return 'default';
  }
};

const columns = [
  { id: 'Aberto', title: 'Abertos', color: '#EF4444' },
  { id: 'Em Andamento', title: 'Em Andamento', color: '#F59E0B' },
  { id: 'Resolvido', title: 'Resolvidos', color: '#10B981' },
  { id: 'Fechado', title: 'Fechados', color: '#6B7280' },
];

export function KanbanView({ tickets }: KanbanViewProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    // Implementar lógica de drag and drop aqui
    console.log('Moved ticket from', result.source, 'to', result.destination);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)', overflow: 'auto' }}>
        {columns.map((column) => (
          <Box
            key={column.id}
            sx={{
              width: 320,
              flexShrink: 0,
            }}
          >
            <Paper
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: column.color,
                    mr: 1,
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {column.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {tickets.filter((ticket) => ticket.status === column.id).length}
                </Typography>
              </Box>

              <Droppable droppableId={column.id}>
                {(provided: DroppableProvided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      flex: 1,
                      minHeight: 100,
                      overflow: 'auto',
                    }}
                  >
                    {tickets
                      .filter((ticket) => ticket.status === column.id)
                      .map((ticket, index) => (
                        <Draggable
                          key={ticket.id}
                          draggableId={String(ticket.id)}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                p: 2,
                                mb: 1,
                                bgcolor: 'background.paper',
                                '&:hover': {
                                  bgcolor: 'action.hover',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" noWrap>
                                  {ticket.title}
                                </Typography>
                                <IconButton size="small">
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 1,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {ticket.description}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Chip
                                  label={ticket.priority}
                                  size="small"
                                  color={getPriorityColor(ticket.priority)}
                                />
                                {ticket.assignedTo && (
                                  <Chip
                                    label={ticket.assignedTo}
                                    size="small"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          </Box>
        ))}
      </Box>
    </DragDropContext>
  );
} 