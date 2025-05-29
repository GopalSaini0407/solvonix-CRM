import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon, EllipsisVerticalIcon, XMarkIcon, CheckIcon, ArrowPathIcon, EnvelopeIcon, PhoneIcon, UserIcon, BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

// Helper functions
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  return { [droppableSource.droppableId]: sourceClone, [droppableDestination.droppableId]: destClone };
};

const stageColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  qualified: 'bg-yellow-100 text-yellow-800',
  converted: 'bg-green-100 text-green-800'
};

const stageIcons = {
  new: <PlusIcon className="h-4 w-4" />,
  contacted: <EnvelopeIcon className="h-4 w-4" />,
  qualified: <CheckIcon className="h-4 w-4" />,
  converted: <CurrencyDollarIcon className="h-4 w-4" />
};

const LeadsPage = () => {
  const [leads, setLeads] = useState(() => {
    const savedLeads = localStorage.getItem('leads');
    return savedLeads ? JSON.parse(savedLeads) : {
      new: [
        { id: '1', name: 'John Doe', company: 'Acme Inc', email: 'john@acme.com', phone: '+1 555-1234', value: '$5,000', notes: 'Interested in premium plan', lastContact: '2023-05-15' },
        { id: '2', name: 'Jane Smith', company: 'Globex', email: 'jane@globex.com', phone: '+1 555-5678', value: '$3,200', notes: 'Follow up next week', lastContact: '2023-05-10' }
      ],
      contacted: [
        { id: '3', name: 'Bob Johnson', company: 'Initech', email: 'bob@initech.com', phone: '+1 555-9012', value: '$7,500', notes: 'Waiting for decision', lastContact: '2023-05-18' }
      ],
      qualified: [],
      converted: []
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [leadDetailsModal, setLeadDetailsModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: '',
    notes: ''
  });

  // Save to localStorage whenever leads change
  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd) {
      setLeads({
        ...leads,
        [sInd]: reorder(leads[sInd], source.index, destination.index)
      });
    } else {
      const result = move(leads[sInd], leads[dInd], source, destination);
      setLeads({
        ...leads,
        [sInd]: result[sInd],
        [dInd]: result[dInd]
      });
    }
  };

  const addNewLead = () => {
    if (!newLead.name || !newLead.email) return;
    
    const newId = Math.random().toString(36).substr(2, 9);
    const leadToAdd = { 
      ...newLead, 
      id: newId,
      lastContact: new Date().toISOString().split('T')[0]
    };
    
    setLeads({
      ...leads,
      new: [...leads.new, leadToAdd]
    });
    
    setNewLeadModal(false);
    setNewLead({ name: '', company: '', email: '', phone: '', value: '', notes: '' });
  };

  const deleteLead = (stage, id) => {
    setLeads({
      ...leads,
      [stage]: leads[stage].filter(lead => lead.id !== id)
    });
  };

  const updateLead = (stage, updatedLead) => {
    setLeads({
      ...leads,
      [stage]: leads[stage].map(lead => lead.id === updatedLead.id ? updatedLead : lead)
    });
    setLeadDetailsModal(null);
  };

  const filteredLeads = (stage) => {
    let stageLeads = leads[stage];
    
    // Apply search filter
    if (searchTerm) {
      stageLeads = stageLeads.filter(lead => 
        Object.values(lead).some(
          val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ))
    }
    
    // Apply status filter
    if (activeFilter === 'recent') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      stageLeads = stageLeads.filter(lead => 
        new Date(lead.lastContact) > sevenDaysAgo
      );
    } else if (activeFilter === 'highValue') {
      stageLeads = stageLeads.filter(lead => 
        parseFloat(lead.value?.replace(/[^0-9.]/g, '')) > 5000
      );
    }
    
    return stageLeads;
  };

  const getTotalValue = (stage) => {
    return leads[stage].reduce((sum, lead) => {
      const value = parseFloat(lead.value?.replace(/[^0-9.]/g, '')) || 0;
      return sum + value;
    }, 0);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads Pipeline</h1>
          <p className="text-gray-500">Track and manage your sales leads</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Leads</option>
              <option value="recent">Recent (7 days)</option>
              <option value="highValue">High Value ($5k+)</option>
            </select>
            
            <button 
              onClick={() => setNewLeadModal(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Lead
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(leads).map(([stage, items]) => (
          <div key={stage} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 uppercase font-medium">{stage}</p>
                <p className="text-2xl font-bold mt-1">{items.length}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[stage]}`}>
                ${getTotalValue(stage).toLocaleString()}
              </span>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div 
                className={`h-2 rounded-full ${stageColors[stage].split(' ')[0]}`}
                style={{ width: `${(items.length / (Object.values(leads).flat().length || 1)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Leads Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(leads).map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white rounded-xl shadow-sm border ${snapshot.isDraggingOver ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'} transition-colors`}
                >
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center gap-2">
                      <span className={`p-2 rounded-lg ${stageColors[stage]}`}>
                        {stageIcons[stage]}
                      </span>
                      <div>
                        <h2 className="font-semibold capitalize">{stage}</h2>
                        <p className="text-xs text-gray-500">{filteredLeads(stage).length} leads</p>
                      </div>
                    </div>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                  
                  <div className="p-3 space-y-3 min-h-[100px]">
                    {filteredLeads(stage).length === 0 ? (
                      <div className="text-center py-6 text-gray-400">
                        <p>No leads in this stage</p>
                        {stage === 'new' && (
                          <button 
                            onClick={() => setNewLeadModal(true)}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1"
                          >
                            <PlusIcon className="h-4 w-4" /> Add lead
                          </button>
                        )}
                      </div>
                    ) : (
                      filteredLeads(stage).map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setLeadDetailsModal({ ...lead, stage })}
                              className={`border rounded-lg p-3 hover:shadow-md transition cursor-grab active:cursor-grabbing bg-white ${
                                snapshot.isDragging ? 'shadow-lg border-indigo-300' : 'border-gray-200'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-800 truncate">{lead.name}</h3>
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded whitespace-nowrap">
                                  {lead.value}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 truncate">{lead.company}</p>
                              
                              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <EnvelopeIcon className="h-3 w-3" />
                                  <span className="truncate max-w-[120px]">{lead.email}</span>
                                </div>
                                <div>
                                  {lead.lastContact && (
                                    <span className="text-xs bg-gray-50 px-2 py-1 rounded">
                                      {new Date(lead.lastContact).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Add Lead Modal */}
      {newLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Lead</h2>
              <button onClick={() => setNewLeadModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: <UserIcon className="h-5 w-5 text-gray-400" />, label: 'Name', key: 'name', required: true },
                { icon: <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />, label: 'Company', key: 'company' },
                { icon: <EnvelopeIcon className="h-5 w-5 text-gray-400" />, label: 'Email', key: 'email', required: true, type: 'email' },
                { icon: <PhoneIcon className="h-5 w-5 text-gray-400" />, label: 'Phone', key: 'phone', type: 'tel' },
                { icon: <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />, label: 'Value', key: 'value' }
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}{field.required && '*'}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                    <input
                      type={field.type || 'text'}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${!newLead[field.key] && field.required ? 'border-red-300' : 'border-gray-300'}`}
                      value={newLead[field.key]}
                      onChange={(e) => setNewLead({...newLead, [field.key]: e.target.value})}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required={field.required}
                    />
                  </div>
                </div>
              ))}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  rows={3}
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setNewLeadModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={addNewLead}
                disabled={!newLead.name || !newLead.email}
                className={`px-4 py-2 rounded-lg transition ${!newLead.name || !newLead.email ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Details Modal */}
      {leadDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Lead Details</h2>
              <button onClick={() => setLeadDetailsModal(null)} className="p-1 rounded-full hover:bg-gray-100">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{leadDetailsModal.name}</h3>
                <span className={`px-2 py-1 text-sm rounded-full ${stageColors[leadDetailsModal.stage]}`}>
                  {leadDetailsModal.stage}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{leadDetailsModal.company || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="font-medium">{leadDetailsModal.value || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={`mailto:${leadDetailsModal.email}`} className="font-medium text-indigo-600 hover:underline">
                    {leadDetailsModal.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href={`tel:${leadDetailsModal.phone}`} className="font-medium text-indigo-600 hover:underline">
                    {leadDetailsModal.phone || '-'}
                  </a>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last Contact</p>
                <p className="font-medium">
                  {leadDetailsModal.lastContact ? 
                    new Date(leadDetailsModal.lastContact).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 
                    'Not contacted yet'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={leadDetailsModal.notes || ''}
                  onChange={(e) => setLeadDetailsModal({...leadDetailsModal, notes: e.target.value})}
                  rows={3}
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => deleteLead(leadDetailsModal.stage, leadDetailsModal.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Delete Lead
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setLeadDetailsModal(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateLead(leadDetailsModal.stage, leadDetailsModal)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;