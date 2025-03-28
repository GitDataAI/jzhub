'use client';
import { Button,  TextInput, Textarea, Radio, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

export default function NewAccess() {
    return (
        <div className="access">
            <h1>New fine-grained personal access token</h1>
            <p className="description">Create a fine-grained, repository-scoped token suitable for personal API use and for using Git over HTTPS.</p>

            <div className="form-group">
                <TextInput
                    label="Token name "
                    placeholder="Enter token name"
                    description="A unique name for this token. May be visible to resource owners or users with possession of the token."
                    required
                />
            </div>

            <div className="form-group">
                <Textarea
                    label="Description"
                    placeholder="Enter description"
                    minRows={4}
                />
            </div>

            <div className="form-group">
                <Select
                    label="Resource owner"
                    placeholder="Select resource owner"
                    data={[""]}
                    description="The token will only be able to make changes to resources owned by the selected resource owner. Tokens can always read all public repositories."
                />
            </div>

            <div className="form-group">
                <DatePickerInput
                    label="Expiration"
                    placeholder="Select date"
                    description="The token will expire on the selected date"
                    defaultValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                />
            </div>

            <div className="form-group">
                <h2>Repository access</h2>
                <Radio.Group defaultValue="public">
                    <Radio value="public" label="Public repositories" description="Read-only access to public repositories." />
                    <Radio value="all" label="All repositories" description="This applies to all current and future repositories you own. Also includes public repositories (read-only)." />
                    <Radio value="select" label="Only select repositories" description="Select at least one repository. Max 50 repositories. Also includes public repositories (read-only)." />
                </Radio.Group>
            </div>



            <div className="form-actions">
                <Button color="orange">Generate</Button>
                <Button color="gray">Cancel</Button>
            </div>
        </div>
    );
}