import { describe, it, expect } from 'vitest'
import SectionHeader from '../components/SectionHeader'
import { dsProjects, webProjects } from '../data/projects'

describe('sanity', () => {
  it('SectionHeader is a function', () => {
    expect(typeof SectionHeader).toBe('function')
  })
  it('projects lists are populated', () => {
    expect(dsProjects.length).toBeGreaterThan(0)
    expect(webProjects.length).toBeGreaterThan(0)
  })
})
