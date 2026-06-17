'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ConfirmDialog } from '@/components/ConfirmDialog';

type WaterType = 'freshwater' | 'saltwater';

type SavedSpot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  species: string;
  waterType: string;
  notes: string | null;
  createdAt: string;
};

type SavedSpotsSectionProps = {
  userId: string | null;
  waterType: WaterType;
  canSave: boolean;
  prefillSpecies?: string;
  prefillLatitude?: number;
  prefillLongitude?: number;
};

const styles: Record<string, CSSProperties> = {
  section: { marginTop: '32px' },
  heading: { fontSize: '20px', margin: '0 0 16px', color: '#e2a83b' },
  card: {
    backgroundColor: 'rgba(16, 39, 64, 0.85)',
    border: '1px solid #1e3a5f',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
  },
  label: { display: 'block', fontSize: '13px', color: '#9fb3c8', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #2c4a6e',
    backgroundColor: '#0b1f33',
    color: '#e8eef5',
    fontSize: '15px',
    boxSizing: 'border-box',
    marginBottom: '12px',
  },
  prefill: { fontSize: '13px', color: '#9fb3c8', marginBottom: '12px', lineHeight: 1.5 },
  saveButton: {
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#e2a83b',
    color: '#0b1f33',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  buttonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  spotName: { fontSize: '17px', fontWeight: 600, color: '#e8eef5', margin: '0 0 4px' },
  spotSpecies: { fontStyle: 'italic', color: '#9fb3c8', margin: '0 0 8px' },
  spotMeta: { fontSize: '13px', color: '#9fb3c8', margin: '0' },
  spotNotes: { fontSize: '14px', color: '#cdd9e5', margin: '8px 0 0' },
  deleteButton: {
    marginTop: '12px',
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1px solid #7f1d1d',
    backgroundColor: 'transparent',
    color: '#f87171',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  empty: { color: '#9fb3c8', fontSize: '14px' },
  error: { color: '#f87171', fontSize: '14px', marginBottom: '12px' },
  link: { color: '#5fd0c5', fontWeight: 600 },
};

export const SavedSpotsSection = ({
  userId,
  waterType,
  canSave,
  prefillSpecies,
  prefillLatitude,
  prefillLongitude,
}: SavedSpotsSectionProps) => {
  const [spots, setSpots] = useState<SavedSpot[]>([]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const loadSpots = useCallback(async () => {
    if (userId === null) {
      return;
    }
    try {
      const response = await fetch('/api/spots', {
        method: 'GET',
        headers: { 'x-user-id': userId },
      });
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as { spots: SavedSpot[] };
      setSpots(data.spots.filter((spot) => spot.waterType === waterType));
    } catch {
      setErrorMessage('Could not load your saved spots.');
    }
  }, [userId, waterType]);

  useEffect(() => {
    void loadSpots();
  }, [loadSpots]);

  const canSubmit =
    userId !== null &&
    canSave &&
    name.trim().length > 0 &&
    prefillSpecies !== undefined &&
    prefillLatitude !== undefined &&
    prefillLongitude !== undefined &&
    !isSaving;

  const handleSave = async () => {
    if (!canSubmit || userId === null) {
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          name: name.trim(),
          latitude: prefillLatitude,
          longitude: prefillLongitude,
          species: prefillSpecies,
          waterType,
          notes: notes.trim() === '' ? null : notes.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error('save failed');
      }
      const data = (await response.json()) as { spot: SavedSpot };
      setSpots((current) => [data.spot, ...current]);
      setName('');
      setNotes('');
    } catch {
      setErrorMessage('Could not save that spot. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (pendingDeleteId === null || userId === null) {
      return;
    }
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    try {
      const response = await fetch('/api/spots', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('delete failed');
      }
      setSpots((current) => current.filter((spot) => spot.id !== id));
    } catch {
      setErrorMessage('Could not delete that spot. Please try again.');
    }
  };

  if (userId === null) {
    return (
      <section style={styles.section}>
        <h2 style={styles.heading}>Saved spots</h2>
        <p style={styles.empty}>
          <Link href="/login" style={styles.link}>Log in</Link> to save this spot and see your saved spots.
        </p>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Saved spots</h2>

      {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

      {canSave ? (
        <div style={styles.card}>
          <p style={styles.prefill}>
            Saving <strong>{prefillSpecies}</strong> at {prefillLatitude}, {prefillLongitude} ({waterType})
          </p>
          <label style={styles.label}>
            Spot name
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. North jetty, early morning"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label style={styles.label}>
            Notes (optional)
            <input
              style={styles.input}
              type="text"
              placeholder="Anything worth remembering"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSubmit}
            style={canSubmit ? styles.saveButton : { ...styles.saveButton, ...styles.buttonDisabled }}
          >
            {isSaving ? 'Saving…' : 'Save this spot'}
          </button>
        </div>
      ) : null}

      {spots.length === 0 ? (
        <p style={styles.empty}>You haven&apos;t saved any {waterType} spots yet.</p>
      ) : (
        spots.map((spot) => (
          <div key={spot.id} style={styles.card}>
            <p style={styles.spotName}>{spot.name}</p>
            <p style={styles.spotSpecies}>{spot.species}</p>
            <p style={styles.spotMeta}>{spot.latitude}, {spot.longitude}</p>
            {spot.notes ? <p style={styles.spotNotes}>{spot.notes}</p> : null}
            <button type="button" onClick={() => setPendingDeleteId(spot.id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))
      )}

      <ConfirmDialog
        isOpen={pendingDeleteId !== null}
        title="Delete saved spot"
        message="Delete this saved spot? This can't be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </section>
  );
};