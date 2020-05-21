pragma solidity >=0.5.0 <0.7.0;

contract TodoList {
    // At the beginning we start with 0 tasks
    uint taskCount = 0;

    // Reference for the file stored on IPFS
    string fileHash;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // Use mapping with an index as key, rather then array, since mapping is more efficient
    mapping(uint => Task) public tasks;

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted (
        uint id,
        bool completed
    );

    constructor() public {
        // Create first task
        string memory _content = "First Task";
        createTask(_content);
    }

    function setHash(string memory _fileHash) public {
      fileHash = _fileHash;
    }

    function getHash() public view returns (string memory) {
      return fileHash;
    }

    function getAccountBalance() public view returns (uint) {
      address currentAccountAddress = msg.sender;
      uint accountBalance = currentAccountAddress.balance;
      return accountBalance;
    }

    function getContractBalance() public view returns (uint) {
        address self = address(this);
        uint contractBalance = self.balance;
        return contractBalance;
    }

    function randomBytes() public view returns (bytes32) {
        // Generate random bytes
        return bytes32(keccak256(abi.encodePacked(block.difficulty, block.timestamp, tasks[taskCount].content)));
    }

    function randomIndex() private view returns (uint) {
        // Generate random index
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, tasks[taskCount].content)));
    }

    function getTaskCount() public view returns (uint) {
        return taskCount;
    }

    function createTask(string memory _content) public {
        // Create new task
        taskCount += 1;
        bool completed = false;
        tasks[taskCount] = Task(taskCount, _content, completed);
        emit TaskCreated(taskCount, _content, completed);
    }

    function completeTask(uint _index) public {
        // Get task at _index
        Task storage getTask = tasks[_index];
        // Switch from false to true
        getTask.completed = !getTask.completed;
        // Update the task
        tasks[_index] = getTask;
        emit TaskCompleted(_index, getTask.completed);
    }

    function getRandomTask() public view returns (uint, string memory, bool) {
        // Return a random task, and its propperties
        uint getRandomIndex = randomIndex() % getTaskCount();
        Task storage randomTask = tasks[getRandomIndex];
        return (
            randomTask.id,
            randomTask.content,
            randomTask.completed
        );
    }
}
