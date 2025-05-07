import { Request, Response } from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from '../services/userService';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;
    const user = await registerUser(email, name, password);
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ id: user.id, email: user.email, name: user.name, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const userUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const userId = (req as any).user.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    if (id !== userId) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }
    const { email, name, password } = req.body;
    const user = await updateUser(id, { email, name, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const userDelete = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const userId = (req as any).user.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    if (id !== userId) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }
    await deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};