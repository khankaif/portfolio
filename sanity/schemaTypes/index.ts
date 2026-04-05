import { project } from './project'
import { challengeBlock } from './blocks/challengeBlock'
import { whatIDidBlock } from './blocks/whatIDidBlock'
import { stackBlock } from './blocks/stackBlock'
import { mediaBlock } from './blocks/mediaBlock'
import { statsBlock } from './blocks/statsBlock'
import { outcomeBlock } from './blocks/outcomeBlock'

export const schemaTypes = [
    // Document
    project,
    // Blocks
    challengeBlock,
    whatIDidBlock,
    stackBlock,
    mediaBlock,
    statsBlock,
    outcomeBlock,
]
